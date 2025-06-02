export function createSlugUsername(username: string): string {
  return username
    // Normaliza para remover acentos
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    // Substitui ç por c
    .replace(/ç/g, 'c')
    // Substitui espaços por hífen
    .replace(/\s+/g, '-')
    // Remove caracteres especiais exceto hífen
    .replace(/[^a-zA-Z0-9-]/g, '')
    // Remove hífens duplicados
    .replace(/-+/g, '-')
    // Remove hífens do início e fim
    .replace(/^-+|-+$/g, '')
    // Converte para minúsculas
    .toLowerCase()
    .trim()
}