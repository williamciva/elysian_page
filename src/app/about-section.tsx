import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";


type AboutProps = {
    isMobile: boolean;
}

const AboutSection: FC<AboutProps> = (props) => {
    return (
        <section id="about">
            <Box
                bgcolor="secondary.main"
                color="primary.contrastText"
                py={5}
                style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <Container>
                    <Typography variant={props.isMobile ? 'h5' : 'h3'} textAlign="center" gutterBottom>
                        Transforme seu negócio com a blockchain
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        Entre na nova era digital, e revolucione o mercado com soluções blockchain inovadoras.
                    </Typography>
                </Container>
            </Box>

            {/* Seção de Vantagens */}
            <Box py={5}>
                <Container>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                                <Image src="/security.png" alt="Segurança Máxima" width={50} height={50} />
                                <Typography variant="h6" textAlign="center" gutterBottom>
                                    Segurança Máxima
                                </Typography>
                                <Typography variant="body2" textAlign="center">
                                    Garanta a segurança dos dados com criptografia avançada e tecnologia de ponta.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                                <Image src="/clock.png" alt="Eficiência e Velocidade" width={50} height={50} />
                                <Typography variant="h6" textAlign="center" gutterBottom>
                                    Eficiência e Velocidade
                                </Typography>
                                <Typography variant="body2" textAlign="center">
                                    Processe transações rapidamente, sem intermediários, reduzindo custos e tempo.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                                <Image src="/idea.png" alt="Inovação e Crescimento" width={50} height={50} />
                                <Typography variant="h6" textAlign="center" gutterBottom>
                                    Inovação e Crescimento
                                </Typography>
                                <Typography variant="body2" textAlign="center">
                                    Explore novos modelos de negócios e abra portas para o crescimento exponencial.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Chamada para Ação */}
            <Box bgcolor="secondary.main" color="primary.contrastText" py={5}>
                <Container>
                    <Typography variant={props.isMobile ? 'h5' : 'h4'} textAlign="center" gutterBottom>
                        Pronto para revolucionar seu negócio?
                    </Typography>
                    <Typography variant="h6" textAlign="center">
                        Entre em contato conosco hoje mesmo e dê o primeiro passo para o futuro!
                    </Typography>
                </Container>
            </Box>
        </section>
    )
}


export default AboutSection;