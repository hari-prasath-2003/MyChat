export default async function upload(url, body, fileType, assetType) {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: body,
      headers: { fileType: fileType, assetType: assetType },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    throw new Error("An error occurred while processing the request.");
  }
}
