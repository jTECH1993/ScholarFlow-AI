export const USER_LOCAL_FOLDER = `E:\\Academic\\AI\\Generative & Agentic AI\\Jtech Generative & Agentic AI\\Codes & Files\\Vital Sign Papers for RAG`;

export const STREAMLIT_CODE = `"""
Vital Sign Papers RAG Assistant
Academic Project Submission - Generative & Agentic AI
Built with Streamlit, LangChain, and Ollama
"""

import os
import streamlit as st
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.llms import Ollama
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# Configuration
DOCS_DIR = r"${USER_LOCAL_FOLDER}"
OLLAMA_BASE_URL = "http://localhost:11434"
LLM_MODEL = "llama3.2:3b"  # or "qwen2.5:3b", "gemma3:4b", "deepseek-r1:1.5b"
EMBED_MODEL = "nomic-embed-text"  # or "bge-m3"
CHROMA_PERSIST_DIR = "./chroma_vital_signs_db"

st.set_page_config(page_title="Vital Sign Papers RAG", layout="wide", page_icon="🫀")

st.title("🫀 Vital Sign Papers RAG Assistant")
st.caption("Retrieval-Augmented Generation over 43 Academic Papers on Vital Signs Monitoring")

# Sidebar Configuration
with st.sidebar:
    st.header("⚙️ Model & RAG Settings")
    selected_model = st.selectbox(
        "Ollama LLM Model",
        ["llama3.2:3b", "qwen2.5:3b", "deepseek-r1:1.5b", "gemma3:4b"],
        index=0
    )
    chunk_size = st.slider("Chunk Size", 500, 2000, 1000, step=100)
    chunk_overlap = st.slider("Chunk Overlap", 50, 400, 200, step=50)
    top_k = st.slider("Top-K Retrieved Chunks", 2, 8, 4)
    
    st.divider()
    st.markdown(f"**Indexed Directory:**\\n\`{DOCS_DIR}\`")
    
    if st.button("🔄 Build / Reload Vector Store"):
        with st.spinner("Loading 43 PDF papers and computing embeddings..."):
            if not os.path.exists(DOCS_DIR):
                st.error(f"Directory not found: {DOCS_DIR}. Please check the folder path.")
            else:
                loader = PyPDFDirectoryLoader(DOCS_DIR)
                docs = loader.load()
                st.info(f"Loaded {len(docs)} pages from PDF directory.")
                
                text_splitter = RecursiveCharacterTextSplitter(
                    chunk_size=chunk_size,
                    chunk_overlap=chunk_overlap
                )
                splits = text_splitter.split_documents(docs)
                st.info(f"Generated {len(splits)} text chunks.")
                
                embeddings = OllamaEmbeddings(
                    model=EMBED_MODEL,
                    base_url=OLLAMA_BASE_URL
                )
                vectorstore = Chroma.from_documents(
                    documents=splits,
                    embedding=embeddings,
                    persist_directory=CHROMA_PERSIST_DIR
                )
                st.success("Vector store built successfully and saved locally!")
                st.session_state["vectorstore_ready"] = True

# Vector Store Initialization
@st.cache_resource
def get_vectorstore():
    embeddings = OllamaEmbeddings(model=EMBED_MODEL, base_url=OLLAMA_BASE_URL)
    if os.path.exists(CHROMA_PERSIST_DIR):
        return Chroma(persist_directory=CHROMA_PERSIST_DIR, embedding_function=embeddings)
    return None

# Chat History
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "Hello! I am your Vital Sign Research Assistant. Ask any question about the 43 vital sign papers (PPG, ECG, Cuffless Blood Pressure, rPPG, Radar Vital Signs, Respiratory Rate, or Sepsis Early Warning)."}
    ]

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# User Query Handling
if prompt := st.chat_input("Ask a question about the vital sign research papers..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    vs = get_vectorstore()
    if vs is None and not os.path.exists(CHROMA_PERSIST_DIR):
        with st.chat_message("assistant"):
            st.warning("Please click 'Build / Reload Vector Store' in the sidebar first to index your 43 PDFs.")
    else:
        with st.chat_message("assistant"):
            with st.spinner(f"Retrieving context and generating answer via {selected_model}..."):
                try:
                    retriever = vs.as_retriever(search_kwargs={"k": top_k})
                    llm = Ollama(model=selected_model, base_url=OLLAMA_BASE_URL, temperature=0.2)
                    
                    system_prompt = (
                        "You are an expert clinical AI research assistant. Use the following retrieved excerpts "
                        "from the Vital Sign research papers to answer the question rigorously with source citations.\\n\\n"
                        "{context}"
                    )
                    prompt_template = ChatPromptTemplate.from_messages([
                        ("system", system_prompt),
                        ("human", "{input}"),
                    ])
                    
                    question_answer_chain = create_stuff_documents_chain(llm, prompt_template)
                    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
                    
                    response = rag_chain.invoke({"input": prompt})
                    answer = response["answer"]
                    st.markdown(answer)
                    
                    # Display Source Attribution
                    with st.expander("📚 Retrieved Evidence Chunks & Citations"):
                        for i, doc in enumerate(response["context"]):
                            source = os.path.basename(doc.metadata.get("source", "Unknown Paper"))
                            page = doc.metadata.get("page", "N/A")
                            st.markdown(f"**[Source {i+1}]** \`{source}\` *(Page {page})*")
                            st.caption(doc.page_content[:400] + "...")
                    
                    st.session_state.messages.append({"role": "assistant", "content": answer})
                except Exception as e:
                    st.error(f"Error connecting to Ollama: {str(e)}")
                    st.info("Ensure Ollama is running locally (\`ollama serve\`) and models are downloaded.")
`;

export const FASTAPI_BACKEND_CODE = `"""
Vital Sign Papers RAG - FastAPI Backend
Connects React Frontend with Local LangChain and Ollama
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.llms import Ollama
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

app = FastAPI(title="Vital Signs RAG Backend")

# Allow CORS for React Web App
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DOCS_DIR = r"${USER_LOCAL_FOLDER}"
CHROMA_DIR = "./chroma_vital_signs_db"
EMBED_MODEL = "nomic-embed-text"
OLLAMA_URL = "http://localhost:11434"

class QueryRequest(BaseModel):
    query: str
    model: str = "llama3.2:3b"
    top_k: int = 4
    temperature: float = 0.2

class ChunkCitation(BaseModel):
    source: str
    page: Optional[int]
    content: str

class QueryResponse(BaseModel):
    answer: str
    citations: List[ChunkCitation]
    model_used: str

vectorstore = None

@app.on_event("startup")
def startup_db():
    global vectorstore
    embeddings = OllamaEmbeddings(model=EMBED_MODEL, base_url=OLLAMA_URL)
    if os.path.exists(CHROMA_DIR):
        vectorstore = Chroma(persist_directory=CHROMA_DIR, embedding_function=embeddings)
        print("Existing vector store loaded successfully.")
    else:
        print("Vector store not found. Use /build-index to index your 43 PDFs.")

@app.post("/build-index")
def build_index():
    global vectorstore
    if not os.path.exists(DOCS_DIR):
        raise HTTPException(status_code=404, detail=f"PDF folder not found at {DOCS_DIR}")
    
    loader = PyPDFDirectoryLoader(DOCS_DIR)
    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = splitter.split_documents(docs)
    
    embeddings = OllamaEmbeddings(model=EMBED_MODEL, base_url=OLLAMA_URL)
    vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings, persist_directory=CHROMA_DIR)
    return {"status": "success", "indexed_documents": len(docs), "total_chunks": len(splits)}

@app.post("/chat", response_model=QueryResponse)
def query_rag(req: QueryRequest):
    global vectorstore
    if vectorstore is None:
        raise HTTPException(status_code=400, detail="Vector store not initialized. Call /build-index first.")
    
    retriever = vectorstore.as_retriever(search_kwargs={"k": req.top_k})
    llm = Ollama(model=req.model, base_url=OLLAMA_URL, temperature=req.temperature)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert Clinical AI assistant for vital signs research. Answer using retrieved context with exact citations:\\n\\n{context}"),
        ("human", "{input}"),
    ])
    
    chain = create_retrieval_chain(retriever, create_stuff_documents_chain(llm, prompt))
    result = chain.invoke({"input": req.query})
    
    citations = [
        ChunkCitation(
            source=os.path.basename(doc.metadata.get("source", "Paper")),
            page=doc.metadata.get("page"),
            content=doc.page_content[:300]
        )
        for doc in result["context"]
    ]
    
    return QueryResponse(
        answer=result["answer"],
        citations=citations,
        model_used=req.model
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
`;

export const REQUIREMENTS_TXT = `streamlit>=1.35.0
langchain>=0.2.5
langchain-community>=0.2.5
langchain-ollama>=0.1.0
pypdf>=4.2.0
chromadb>=0.5.0
fastapi>=0.111.0
uvicorn>=0.30.0
`;
