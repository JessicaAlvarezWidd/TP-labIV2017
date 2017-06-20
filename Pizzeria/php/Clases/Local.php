<?php

class Local
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
    public $nombre;
    public $direccion;
    public $foto;
    public $nroLocal;
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
    public function GetNroLocal()
	{
		return $this->nroLocal;
	}
	public function SetNroLocal($valor)
	{
		$this->nroLocal = $valor;
	}

  	public function Getnombre()
	{
		return $this->nombre;
	}
	public function Setnombre($valor)
	{
		$this->nombre = $valor;
	}

    public function GetDireccion()
	{
		return $this->direccion;
	}
	public function SetDireccion($valor)
	{
		$this->direccion = $valor;
	}
    
    public function GetFoto()
	{
		return $this->foto;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($direccion,$nombre,$foto,$nroLocal)
	{	
		$this->nombre = $nombre;
        $this->direccion = $direccion;
        $this->foto = $foto;
        $this->nroLocal = $nroLocal;
	}