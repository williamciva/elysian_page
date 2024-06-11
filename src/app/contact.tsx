import React, { useState, ChangeEventHandler, ChangeEvent, FormEventHandler } from "react";
import {
  Typography,
  Box,
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent
} from "@mui/material";


type FormData = {
  name: string,
  email: string,
  subject: string,
  message: string,
  inquiryType: string,
  [key: string]: any,
}

const defaultFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  inquiryType: '',
}


const Contact = ({ isMobile }: { isMobile: boolean }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<FormData>();
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    // TODO: @Andriano, precisa corrigir isso e tipar esses retornos de event, aqui fiz uma solução de contorno, mas ficar converterndo objetos em any e depois no tipo desejado não é uma boa prática!!
    const { name, value }: { name: string, value: string } = (event.target as any as { name: string, value: string });
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors: FormData = defaultFormData;
    if (!formData.name) newErrors.name = "Nome completo é obrigatório";
    if (!formData.email.match('/^\S+@\S+\.\S+$/')) newErrors.email = "Informe um e-mail válido (exemplo@email.com)";
    if (formData.message.length < 20) newErrors.message = "Mensagem deve ter no mínimo 20 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form data:", formData);
      setSuccessMessage("Sua mensagem foi enviada com sucesso!");
    }
  };

  return (
    <section id="contact">
      <Box bgcolor="inherit" color="#ffffff" py={5} style={{ backgroundImage: 'url(/path/to/your/contact-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Container>
          <Typography variant={isMobile ? "h5" : "h4"} textAlign="center" gutterBottom>
            CONTATO
          </Typography>

          <form onSubmit={onSubmit}>
            <TextField
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              label="Nome"
              fullWidth
              margin="normal"
              error={!!errors?.name}
              helperText={errors?.name || "Nome completo é obrigatório"}
              InputLabelProps={{
                style: { color: '#d852ff' }
              }}
              InputProps={{
                style: { color: '#d852ff' }
              }}
            />

            <TextField
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              label="E-mail"
              fullWidth
              margin="normal"
              error={!!errors?.email}
              helperText={errors?.email || "Informe um e-mail válido (exemplo@email.com)"}
              InputLabelProps={{
                style: { color: '#d852ff' }
              }}
              InputProps={{
                style: { color: '#d852ff' }
              }}
            />

            <TextField
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              label="Assunto (opcional)"
              fullWidth
              margin="normal"
              InputLabelProps={{
                style: { color: '#d852ff' }
              }}
              InputProps={{
                style: { color: '#d852ff' }
              }}
            />

            <TextField
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              label="Mensagem"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              error={!!errors?.message}
              helperText={errors?.message || "Mensagem deve ter no mínimo 20 caracteres"}
              InputLabelProps={{
                style: { color: '#d852ff' }
              }}
              InputProps={{
                style: { color: '#d852ff' }
              }}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="inquiryTypeLabel" style={{ color: '#d852ff' }}>Tipo de consulta (opcional)</InputLabel>
              <Select
                labelId="inquiryTypeLabel"
                name="inquiryType"
                value={formData.inquiryType}
                /* TODO: @Andriano é necessário fazer um check nessa função, ela é a mesma do text field, no entato elas possuem assinaturas diferentes, portanto tipei ela como field e deixo a teu ver como fara o type das duas ou se irá segmentar em dois types separados*/
                // onChange={handleInputChange}
                label="Tipo de consulta"
                style={{ color: '#d852ff' }}
              >
                <MenuItem value="">Selecione</MenuItem>
                <MenuItem value="general">Consulta geral</MenuItem>
                <MenuItem value="support">Suporte técnico</MenuItem>
                <MenuItem value="partnership">Parceria</MenuItem>
              </Select>
              <FormHelperText style={{ color: '#d852ff' }}>Selecione o tipo de consulta para direcionar melhor sua mensagem.</FormHelperText>
            </FormControl>

            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2, bgcolor: '#d852ff' }}>
              Enviar
            </Button>
          </form>

          {successMessage && (
            <Typography variant="body1" color="success.main" align="center">
              {successMessage}
            </Typography>
          )}
        </Container>
      </Box>
    </section>
  );
};

export default Contact;
