export function getBlobReadWriteToken() {
  return (
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.STACY_READ_WRITE_TOKEN ||
    ""
  );
}

export function isBlobConfigured() {
  return Boolean(getBlobReadWriteToken());
}
