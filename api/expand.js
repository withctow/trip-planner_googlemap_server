// api/expand.js
export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // 구글 서버에 요청을 보내 301 리다이렉트 되는 최종 목적지(긴 주소)를 추적
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    const finalUrl = response.url || url;
    return res.status(200).json({ expandedUrl: finalUrl });
  } catch (error) {
    // 에러 발생 시 원본 주소 반환
    return res.status(200).json({ expandedUrl: url });
  }
}