import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../theme/appTheme';
import BotonCalc from '../components/BotonCalc';

const CalculadoraScreen = () => {
  const [numero, setNumero] = useState('100');
  const [numeroAnterior, setNumeroAnterior] = useState('100');

  const limpiar = () => {
    setNumero('0');
  };

  const armarNUmero = (numeroTexto: string) => {
    //No aceptar doble punto
    if (numero.includes('.') && numeroTexto === '.') return;
    if (numero.startsWith('0') || numero.startsWith('-0')) {

        // punto decimal
        if( numeroTexto === '.'){
            setNumero( numero + numeroTexto);
            // evaluar si es otro cero y hay un punto
        }else if( numeroTexto === '0' && numero.includes('.')){
            setNumero( numero + numeroTexto);
            //evaluar si es diferente de cero y no tiene un putno
        }else if(numeroTexto !== '0'&& (!numero.includes('.'))) {
            setNumero( numeroTexto);

        }else if(numeroTexto === '0'&& (!numero.includes('.'))){
            setNumero( numero );

        }else{
            setNumero( numero + numeroTexto);

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

  return (
    <View style={styles.calculadoraContainer}>
      <Text style={styles.resultadoPequeno}>{numeroAnterior}</Text>
      <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>

      <View style={styles.fila}>
        {/* {Boton} */}
        <BotonCalc texto="C" color="#9B9B9B" accion={limpiar} />
        <BotonCalc texto="+/-" color="#9B9B9B" accion={positivoNegativo} />
        <BotonCalc texto="del" accion={limpiar} />
        <BotonCalc texto="/" color="#FF9427" accion={limpiar} />
      </View>
      <View style={styles.fila}>
        {/* {Boton} */}
        <BotonCalc texto="7" accion={armarNUmero} />
        <BotonCalc texto="8" accion={armarNUmero} />
        <BotonCalc texto="0" accion={armarNUmero} />
        <BotonCalc texto="x" color="#FF9427" accion={limpiar} />
      </View>
      <View style={styles.fila}>
        {/* {Boton} */}
        <BotonCalc texto="4" accion={armarNUmero} />
        <BotonCalc texto="5" accion={armarNUmero} />
        <BotonCalc texto="6" accion={armarNUmero} />
        <BotonCalc texto="-" color="#FF9427" accion={limpiar} />
      </View>
      <View style={styles.fila}>
        {/* {Boton} */}
        <BotonCalc texto="1" accion={armarNUmero} />
        <BotonCalc texto="2" accion={armarNUmero} />
        <BotonCalc texto="3" accion={armarNUmero} />
        <BotonCalc texto="+" color="#FF9427" accion={limpiar} />
      </View>
      <View style={styles.fila}>
        {/* {Boton} */}
        <BotonCalc texto="0" ancho accion={armarNUmero} />
        <BotonCalc texto="." accion={armarNUmero} />
        <BotonCalc texto="=" color="#FF9427" accion={limpiar} />
      </View>
    </View>
  );
};

export default CalculadoraScreen;
