<?php

class Cliente extends Persona
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
    public $NroCliente;
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetNroCliente()
	{
		return $this->NroCliente;
	}
	public function SetPassword($valor)
	{
		$this->NroCliente = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($NroCliente,$id,$apellido,$nombre,$sexo,$dni,$password)
	{
		//if($dni != NULL){
			//$obj = Persona::TraerUnaPersona($dni);

            parent::__construct($id,$apellido,$nombre,$sexo,$dni,$password);
			
			$this->NroCliente = $NroCliente;
		}
	}