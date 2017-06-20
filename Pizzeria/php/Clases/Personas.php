<?php
require_once"AccesoDatos.php";
class Persona
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
 	public $apellido;
  	public $dni;
	public $sexo;
	public $password;
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetApellido()
	{
		return $this->apellido;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetDni()
	{
		return $this->dni;
	}
	public function GetSexo()
	{
		return $this->sexo;
	}
	public function GetPassword()
	{
		return $this->password;
	}
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetApellido($valor)
	{
		$this->apellido = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetDni($valor)
	{
		$this->dni = $valor;
	}
	public function SetSexo($valor)
	{
		$this->sexo = $valor;
	}
	public function SetPassword($valor)
	{
		$this->password = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id,$apellido,$nombre,$sexo,$dni,$password)
	{
		//if($dni != NULL){
			//$obj = Persona::TraerUnaPersona($dni);
			
			$this->apellido = $apellido;
			$this->nombre = $nombre;
			$this->dni = $dni;
			$this->sexo = $sexo;
			$this->password = $password;
		}
	}