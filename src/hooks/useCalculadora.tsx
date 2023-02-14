import React, {useRef, useState} from 'react';

enum Operadores {
  suma,
  resta,
  multiplicacion,
  division,
}


export const useCalculadora = () => {
  const [numero, setNumero] = useState('100');
  const [numeroAnterior, setNumeroAnterior] = useState('100');

  const ultimaOperacion = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  const armarNumero = (numeroTexto: string) => {
    //No aceptar doble punto
    if (numero.includes('.') && numeroTexto === '.') return;
    if (numero.startsWith('0') || numero.startsWith('-0')) {
      // punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);
        // evaluar si es otro cero y hay un punto
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);
        //evaluar si es diferente de cero y no tiene un putno
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const btnDelete = () => {
    let negativo = '';
    let numeroTemporal = numero;
    if (numero.includes('-')) {
      negativo = '-';
      numeroTemporal = numero.substring(1);
    }
    if (numeroTemporal.length > 1) {
      setNumero(negativo + numeroTemporal.slice(0, -1));
    } else {
      setNumero('0');
    }
  };

  const cambiarNumeroPorAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDividir = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.division;
  };
  const btnMultiplicar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.multiplicacion;
  };
  const btnRestar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.resta;
  };
  const btnSumar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.suma;
  };
  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.suma:
        setNumero(`${num1 + num2}`);

        break;
      case Operadores.resta:
        setNumero(`${num1 - num2}`);

        break;
      case Operadores.multiplicacion:
        setNumero(`${num1 * num2}`);

        break;
      case Operadores.division:
        setNumero(`${num2 / num1}`);

        break;
    }
    setNumeroAnterior('0');
  };

  return {
    numero,
    numeroAnterior,
    limpiar,
    armarNumero,
    positivoNegativo,
    btnDelete,
    btnSumar,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    calcular
  };
};
