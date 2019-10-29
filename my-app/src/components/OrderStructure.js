import React from 'react';
import '../css/App.css';

export const OrderStructure = ({
	arr,
	setOrderToReady,
	setOrderToDelivered,
}) => {

	return (
		<div>
			{arr.map(product => {
				return (
					<div className="Status" key={product.id}>
						<h2>PEDIDO {product.estado}</h2>
						<p className="">Cliente: {product.name}</p>
						<p className="">N° de Mesa: {product.mesa}</p>
						<p className="">
							Hora de Pedido: {product.date.toDate().getHours()}
							{':'}
							{product.date.toDate().getMinutes()}</p>
           <div>
           {(product.estado === 'listo' || product.estado === 'entregado') && (
							<p>Tiempo Transcurrido: {product.duration}</p>
						)}
           </div>
						<table className="">
							<thead>
								<tr>
									<th colSpan="5">DETALLE DE PEDIDO</th>
								</tr>
								<tr>
									<td>CANT.</td>
									<td>DESCRIPCIÓN</td>
									<td>PU</td>
									<td>SUBTOTAL</td>
								</tr>
							</thead>
							<tbody>
								{product.product.map(p => {
									return (
										<tr key={p.nombre}>
											<td>{p.cantidad}</td>
											<td>{p.nombre}</td>
											<td>{p.precio}</td>
											<td>{p.cantidad * p.precio}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<p className="">Total = S/.{product.total}</p>
						{product.estado === 'pendiente' && (
							<button type="button" onClick={() => setOrderToReady(product)}>
								Marcar como pedido LISTO
							</button>
						)}
						{product.estado === 'listo' && (
							<button type="button" onClick={() => setOrderToDelivered(product)}>
								Marcar como pedido ENTREGADO
							</button>
						)}
					</div>
				);
			})}
		</div>
	);
};
