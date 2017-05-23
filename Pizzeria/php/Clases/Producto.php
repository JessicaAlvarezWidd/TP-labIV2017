<?php

class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
    public $nombre;
    public $foto;
    public $nroProducto;
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
    public function GetNroProducto()
	{
		return $this->nroProducto;
	}
	public function SetNroProducto($valor)
	{
		$this->nroProducto = $valor;
	}

  	public function Getnombre()
	{
		return $this->nombre;
	}
	public function Setnombre($valor)
	{
		$this->nombre = $valor;
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
	public function __construct($nombre,$foto,$nroProducto)
	{	
		$this->nombre = $nombre; 
        $this->foto = $foto;
        $this->nroProducto = $nroProducto;
	}