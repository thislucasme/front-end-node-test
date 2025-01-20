import React, { useState } from 'react';
import { Box, Button, HStack, Image, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthImage from '../resources/auth.svg'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isFailure, setIsFailure] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>()

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      setIsLoading(false)
      navigate('/feed');
    } catch (error: any) {
      setErrorMsg(error?.message)
      setIsFailure(true)
      setIsLoading(false)
    }
  };

  return (
<Box 
  w="100%" // Largura total da tela
  maxW="md" // Limite máximo da largura
  margin="auto" 
  overflowX="hidden" // Esconde o scroll horizontal
>
  <VStack p={{ base: 3, sm: 5 }} spacing={5}> {/* Ajuste do padding responsivo */}
    <Image 
      w={{ base: "80px", sm: "100px" }} 
      src={AuthImage} 
      alt="Auth Image"
      objectFit="contain" // Garantir que a imagem não distorça
    />
    <Input 
      placeholder='Email' 
      type="email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      width="full"
      size="lg" // Aumenta o tamanho do input no celular
    />
    <Input 
      placeholder='Senha' 
      type="password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} 
      width="full"
      size="lg" // Aumenta o tamanho do input no celular
    />
    <Button 
      isLoading={isLoading} 
      w="full" 
      onClick={handleLogin} 
      colorScheme="green"
      size="lg" // Aumenta o botão no celular
    >
      {isLoading ? "Loading..." : "Login"}
    </Button>
    {isFailure && (
      <VStack borderRadius={5} w="full" mt={5} bg="red.300" p={3}>
        <Text textColor="white" textAlign="center">{errorMsg}</Text>
      </VStack>
    )}
    <HStack justify="center">
      <Text>Do not you have an account?</Text>
      <Button onClick={() => navigate("/register")} textColor="green" variant="link">
        Create Account
      </Button>
    </HStack>
  </VStack>
</Box>


  );
};

export default Login;
