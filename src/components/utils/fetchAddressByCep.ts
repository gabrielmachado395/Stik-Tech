export async function fetchAddressByCep(cep: string) {
  if (!cep) return null;
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`);
    const data = await response.json();
    if (data.erro) {
      return null;
    }
    return {
      endereco: data.logradouro,
      numero: "",
      bairro: data.bairro,
      cidade: data.localidade,
      uf: data.uf,
      complemento: ""
    };
  } catch {
    return null;
  }
}