/**
 * Shared context passed to content-uploader tools via closure.
 *
 * Lets tools read/write file contents without the LLM needing to echo
 * the full content through its output tokens.
 */
export interface UploadContext {
  /** Original uploaded file contents, keyed by original filename. */
  originalFiles: Map<string, string>;
  /** Split file contents (populated by split_material), keyed by output filename. */
  splitFiles: Map<string, string>;
}
