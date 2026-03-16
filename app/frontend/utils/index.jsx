import axios from "axios";

export const imagePath = (name) => {
  return `/images/${name}`;
};


export function formatCurrency(value) {
  const numeric = value.replace(/\D/g, "");
  const number = Number(numeric) / 100;

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function currencyToCents(value) {
  return Number(value.replace(/\D/g, ""));
}



export const cardBrandLogo = (name) => {
  switch (name) {
    case "VISA":
      return imagePath("visa.svg");
    case "MASTERCARD":
      return imagePath("mastercard.svg");
    default:
      break;
  }
};
{/* 
export const priceOptions = [
  { value: 8000, label: "R$ 80,00" },
  { value: 10000, label: "R$ 100,00" },
  { value: 12000, label: "R$ 120,00" },
  { value: 14000, label: "R$ 140,00" },
  { value: 15000, label: "R$ 150,00" },
  { value: 16000, label: "R$ 160,00" },
  { value: 18000, label: "R$ 180,00" },
  { value: 20000, label: "R$ 200,00" },
  { value: 22000, label: "R$ 220,00" },
  { value: 24000, label: "R$ 240,00" },
];
*/}
export const pixTypeOptions = [
  { value: "CPF", label: "CPF" },
  { value: "EMAIL", label: "Email" },
  { value: "PHONE", label: "Telefone" },
  { value: "EVP", label: "Aleatória" },
];

export const yesOrNotOptions = [
  { value: 'true', label: "Sim" },
  { value: 'false', label: "Não" },
];

export const specialtyType = [
  { value: "1", label: "Laboratório" },
  { value: "2", label: "Exames Diagnósticos" },
  { value: "3", label: "Ambos" },
];


export const pixTypeMask = (pixType) => {
  if (pixType === "CPF") {
    return "999.999.999-99";
  } else if (pixType === "PHONE") {
    return "(99) 99999-9999";
  }
};

export const monthsTranslated = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const monthsTranslatedAbreviation = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export const weekDaysTranslated = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export const currencyStringToInteger = (currency) => {
  return Number(currency.replace(/[^0-9-]+/g, ""));
};

export const fetchCep = async (data, setData, setError, setLoading) => {
  let latitude = '';
  let longitude = '';
  if (setLoading) setLoading(true);
  axios
    .get(`https://viacep.com.br/ws/${data.address_attributes.cep}/json/`)
    .then(async (response) => {
      if (response.data.erro) {
        setError(true);
      } else {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${data.address_attributes.cep}&key=${apiKey}`;
        const responseCoord = await axios.get(url);
        const responseData = responseCoord.data;

        if (responseData.results && responseData.results.length > 0) {
          const location = responseData.results[0].geometry.location;
          console.log(location.lat, location.lng);
          latitude = location.lat.toString();
          longitude = location.lng.toString();
        }

        setError(false);
        const addressData = {
          cep: data.address_attributes.cep,
          street: response.data.logradouro,
          city: response.data.localidade,
          neighborhood: response.data.bairro,
          complement: response.data.complemento,
          state: response.data.uf,
          latitude: latitude,
          longitude: longitude,
        };

        setData({ ...data, address_attributes: addressData });
      }
      if (setLoading) setLoading(false);
    })
    .catch(() => {
      setError(true);
      if (setLoading) setLoading(false);
    });
};

export const workAreaOptionsFetch = (setData) => {
  const blank = [{ value: "", label: "Todos" }];

  try {
    axios
      .get("/work_areas")
      .then((response) => {
        const options = response.data.map((specialty) => {
          return {
            value: specialty.id,
            label: specialty.nick_name,
            work_specialities: specialty.work_specialties,
          };
        });

        setData(blank.concat(options));
      })
      .catch(() => {
        setData(blank);
      });
  } catch (error) {
    setData(blank);
  }
};

export const specialtyOptions = (setData) => {
  const blank = [{ value: "", label: "Todos" }];

  try {
    axios
      .get("/work_specialties")
      .then((response) => {
        const options = response.data.map((specialty) => {
          return {
            value: specialty.id,
            label: specialty.name,
          };
        });

        setData(blank.concat(options));
      })
      .catch(() => {
        setData(blank);
      });
  } catch (error) {
    setData(blank);
  }
};

export const formatIntegerCurrency = (value) => {
  if (!value) return "R$ 0,00";

  let stringValue = value.toString();
  while (stringValue.length < 3) stringValue = "0" + stringValue;

  const wholePart = stringValue.slice(0, -2);
  const decimalPart = stringValue.slice(-2);

  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `R$ ${formattedWholePart},${decimalPart}`;
};

export const extractTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
