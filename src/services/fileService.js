const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// Inicializa o cliente S3 (as credenciais serão buscadas automaticamente pela AWS SDK)
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: 'IQoJb3JpZ2luX2VjEEwaCXVzLWVhc3QtMSJIMEYCIQDEEREYE3OrbgzAaoJdGrLU6gGaIE1vJmziW57jkydhbQIhAOSRGjBceIboARK3ITZ8Y5duWGwJSGTY+Zj7m6+RPK8/Kq4DCJX//////////wEQABoMNTQ1MDA5ODQ0OTM3IgzIUeDLuCiJWgSCOrgqggMMPPkdlPgF0UEHbB2shy65Yg6DUQ+XkmLhrYsFdVutc0toONydYWM9V8md0i9RLudYteegkF/EpFTLMm9OlbFtEuFJh4sl5ukPYqJJ75zy7R1cZPBFTLz+pOhLHkHCi8ePJfRmx/2+LQDDLAzGOHPBt72xrPwT6w57E/r7z++RaAgsi9FGwu2TBjggavsbErlgNE62sulORwp3ZdjnHwdBiFCuKqkMZiqLm5jZ3NzKiFXyVthfMZ/MshLZIUIxaXL2H0S8wzSFsEMi+RhS4hmcxeNI732z2LynhQH5jehrES2xFfoWzCii3ZX+61dGngXfKozx2vZnIa4uBrJfKGSW0bEvAGIhiBViVfzvV5FcSb0gc2Px635Embf14l4DRpdVTJvW5+EdDSdcziGGiaUO9Va0tK2G4G213o9tOh1mgBqp8rRcxKdyGWPZsLRuyhJRjKKhy2TzcB9i6jqNCmFSOLgj/IOWcyqHoYtG0C6eK6v5HzWIH7wFWDdzbFI6hktaujDQmvG3BjqlAX0UQgSc4TD2erGRgAb5YrWAkYnd68/i8Ewfh9bdRLu8wi9E4DuQtZ0OZ2siaXGuwfc25af5M4O8nGle8L6VczIk9MYLe+YFAD/V3hauQszxvmaDmQ4LY0WF0bDSNuppybeI0R9oy1zJP5FkdSPfhjwCrMecKazRFhJ0KGHERCChPHVvJZ8nw+uURz5jMXnN8/kdkn5nnhKO/alFqWHlmm0r3jY9dw==',
    }
});

const saveToFile = async (data) => {
  try {
    // Converte o JSON para string
    const jsonData = JSON.stringify(data, null, 2);

    // Define o nome fixo do arquivo no S3
    const fileKey = 'rss-data.json';

    // Define o comando de upload para o S3
    const putCommand = new PutObjectCommand({
      Bucket: "sprints-2-3-pb-aws-agosto-b", 
      Key: fileKey, 
      Body: jsonData, 
      ContentType: "application/json", 
    });

    
    await s3Client.send(putCommand);

    console.log(`File saved to S3: ${fileKey}`);
    return fileKey; 
  } catch (err) {
    console.error("Failed to save file to S3:", err.message);
    throw err;
  }
};


module.exports = { saveToFile };