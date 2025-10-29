import { useState, useEffect } from "react";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import CustomerNavbar from "./CustomerNavbar";
import CustomerFooter from "./Footer";

// Configure PDF.js worker

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [userFiles, setUserFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [docType, setDocType] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      setMessage("You must login first to see your files.");
      return;
    }

    const fetchFiles = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://reva-ai-backend.onrender.com/api/files/user-files", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserFiles(res.data.files);
      } catch (err) {
        console.error("Fetch files error:", err);
        setMessage(
          err.response?.status === 401 ? "Unauthorized. Please login again." : "Error fetching files"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [token]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setMessage("");

    if (selectedFile.type === "application/pdf") {
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport }).promise;
        setPreviewUrl(canvas.toDataURL());
      } catch {
        setPreviewUrl(null);
      }
    } else if (selectedFile.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file first!");
    if (!docType) return setMessage("Please select a document type!");
    if (!token) return setMessage("Cannot upload. Please login first.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("docType", docType);

    try {
      setLoading(true);
      const res = await axios.post("https://reva-ai-backend.onrender.com/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || "File uploaded successfully!");
      setUserFiles((prev) => [...prev, res.data.file]);
      setFile(null);
      setPreviewUrl(null);
      setDocType("");
    } catch (err) {
      console.error("Upload error:", err);
      setMessage(
        err.response?.status === 401 ? "Unauthorized. Please login again." : "Upload failed. Check backend/CORS/JWT."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <CustomerNavbar />
      <div className="upload-content">
        <h2 className="page-title">Upload Your Document</h2>
        
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Processing...</p>
          </div>
        )}
        
        {message && (
          <div className={`message ${message.includes("successfully") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpload} className="upload-form">
          <div className="form-controls">
            <div className="select-wrapper">
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="doc-type-select"
              >
                <option value="">Select Document Type</option>
                <option value="aadhar">Aadhar Card</option>
                <option value="pan">PAN Card</option>
                <option value="10th">10th Marksheet</option>
                <option value="12th">12th Marksheet</option>
                <option value="degree">Degree Certificate</option>
              </select>
            </div>

            <div className="file-input-wrapper">
              <label htmlFor="file-upload" className="file-input-label">
                <span className="file-input-text">
                  {file ? file.name : "Choose File"}
                </span>
                <span className="file-input-button">Browse</span>
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>

            <button
              type="submit"
              className="upload-button"
              disabled={loading}
            >
              Upload Document
            </button>
          </div>
        </form>

        {/* Preview Section */}
        {previewUrl && (
          <div className="preview-section">
            <h3>Preview</h3>
            <div className="preview-container">
              {file?.type === "application/pdf" ? (
                <img src={previewUrl} alt="PDF preview" className="preview-image" />
              ) : file?.type.startsWith("image/") ? (
                <img src={previewUrl} alt="File preview" className="preview-image" />
              ) : (
                <p>No preview available</p>
              )}
            </div>
          </div>
        )}

        {/* Uploaded Files */}
        <div className="uploaded-files-section">
          <h3>Your Uploaded Documents</h3>
          
          {userFiles.length > 0 ? (
            <div className="files-grid">
              {userFiles.map((f) => (
                <div key={f._id} className="file-card">
                  <div className="file-preview">
                    {f.mimetype.startsWith("image/") ? (
                      <img src={f.url} alt={f.originalname} className="preview-image" />
                    ) : f.mimetype === "application/pdf" ? (
                      <iframe 
                        src={f.url} 
                        className="preview-iframe" 
                        title={f.originalname} 
                      />
                    ) : (
                      <div className="no-preview">
                        <span className="file-icon">📄</span>
                        <p>No preview available</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="file-info">
                    <p className="file-name">{f.originalname}</p>
                    <p className="file-type">Type: {f.docType || "N/A"}</p>
                    
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-link"
                    >
                      Download File
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="empty-state">
                <p>No documents uploaded yet.</p>
                <p>Upload your first document using the form above.</p>
              </div>
            )
          )}
        </div>
        
        {/* Bottom spacing */}
        <div className="bottom-spacing"></div>
      </div>

      <style jsx>{`
        .file-upload-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
          color: #1b5e20;
        }
        
        .upload-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 2rem 0;
        }
        
        .page-title {
          text-align: center;
          color: #08440bff;
          margin-bottom: 2.5rem;
          font-size: 2.2rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        .loading-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: rgba(232, 245, 233, 0.9);
          border-radius: 12px;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #c8e6c9;
          border-top: 4px solid #2e7d32;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .message {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          text-align: center;
          font-weight: 500;
        }
        
        .message.success {
          background-color: rgba(46, 125, 50, 0.15);
          color: #2e7d32;
          border: 1px solid rgba(46, 125, 50, 0.3);
        }
        
        .message.error {
          background-color: rgba(220, 81, 74, 0.15);
          color: #c62828;
          border: 1px solid rgba(198, 40, 40, 0.3);
        }
        
        .upload-form {
          background: rgba(255, 255, 255, 0.8);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          margin-bottom: 2.5rem;
          border: 1px solid #c8e6c9;
        }
        
        .form-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 1.2rem;
          align-items: center;
          justify-content: center;
        }
        
        .select-wrapper {
          position: relative;
          flex: 1;
          min-width: 200px;
        }
        
        .doc-type-select {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid #a5d6a7;
          border-radius: 8px;
          background-color: white;
          font-size: 1rem;
          color: #2e7d32;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%232e7d32' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .doc-type-select:focus {
          outline: none;
          border-color: #2e7d32;
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.2);
        }
        
        .file-input-wrapper {
          flex: 1;
          min-width: 200px;
        }
        
        .file-input {
          opacity: 0;
          position: absolute;
          width: 0;
          height: 0;
        }
        
        .file-input-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.875rem 1rem;
          border: 1px solid #a5d6a7;
          border-radius: 8px;
          background-color: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .file-input-label:hover {
          border-color: #2e7d32;
        }
        
        .file-input-text {
          color: #4caf50;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 70%;
        }
        
        .file-input-button {
          background: rgba(46, 125, 50, 0.1);
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #2e7d32;
        }
        
        .upload-button {
          padding: 0.875rem 1.5rem;
          background: #2e7d32;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 160px;
          letter-spacing: 0.5px;
        }
        
        .upload-button:hover:not(:disabled) {
          background: #1b5e20;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .upload-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .preview-section {
          background: rgba(255, 255, 255, 0.8);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          margin-bottom: 2.5rem;
          border: 1px solid #c8e6c9;
        }
        
        .preview-section h3 {
          margin-top: 0;
          color: #2e7d32;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        
        .preview-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
          border: 2px dashed #a5d6a7;
          border-radius: 8px;
          padding: 1rem;
          background: rgba(232, 245, 233, 0.5);
        }
        
        .preview-image {
          max-width: 100%;
          max-height: 300px;
          border-radius: 4px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .uploaded-files-section {
          background: rgba(255, 255, 255, 0.8);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          margin-bottom: 2.5rem;
          border: 1px solid #c8e6c9;
        }
        
        .uploaded-files-section h3 {
          margin-top: 0;
          color: #18481aff;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #a5d6a7;
        }
        
        .files-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.8rem;
        }
        
        .file-card {
          border: 1px solid #c8e6c9;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s;
          background: white;
        }
        
        .file-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
          border-color: #2e7d32;
        }
        
        .file-preview {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(232, 245, 233, 0.5);
          border-bottom: 1px solid #c8e6c9;
        }
        
        .preview-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        
        .no-preview {
          text-align: center;
          color: #4caf50;
        }
        
        .file-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .file-info {
          padding: 1.2rem;
        }
        
        .file-name {
          font-weight: 500;
          color: #1b5e20;
          margin: 0 0 0.5rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .file-type {
          font-size: 0.875rem;
          color: #4caf50;
          margin: 0 0 1.2rem 0;
        }
        
        .download-link {
          display: inline-block;
          padding: 0.6rem 1.2rem;
          background: rgba(46, 125, 50, 0.1);
          color: #2e7d32;
          text-decoration: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          border: 1px solid rgba(46, 125, 50, 0.3);
        }
        
        .download-link:hover {
          background: rgba(46, 125, 50, 0.2);
          transform: translateY(-2px);
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #4caf50;
        }
        
        .bottom-spacing {
          height: 3rem;
        }
        
        @media (max-width: 768px) {
          .upload-content {
            padding: 1.5rem 1.5rem 0;
          }
          
          .form-controls {
            flex-direction: column;
          }
          
          .select-wrapper, .file-input-wrapper, .upload-button {
            width: 100%;
          }
          
          .files-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .upload-form, .preview-section, .uploaded-files-section {
            padding: 1.5rem;
          }
        }
      `}</style>
      <CustomerFooter />
    </div>
  );
}