<?php

class Empleado extends Persona
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
    public $legajo;
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetLegajo()
	{
		return $this->legajo;
	}
	public function SetLegajo($valor)
	{
		$this->legajo = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($legajo,$id,$apellido,$nombre,$sexo,$dni,$password)
	{
		//if($dni != NULL){
			//$obj = Persona::TraerUnaPersona($dni);

            parent::__construct($id,$apellido,$nombre,$sexo,$dni,$password);
			
			$this->legajo = $legajo;
		}
	}