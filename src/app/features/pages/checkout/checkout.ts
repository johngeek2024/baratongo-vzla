import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart'; // o ../../../core/services/cart

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class Checkout implements OnInit {
  cartTotal: number = 0;
  readonly deliveryMinAmount = 10;

  // Propiedades para manejar el estado del formulario
  deliveryMethod: 'pickup' | 'local_delivery' | 'national_shipping' = 'pickup';
  localDeliveryType: 'moto' | 'carro' = 'moto';
  nationalCourier: 'mrw' | 'zoom' = 'mrw';
  paymentMethod: 'pago_movil' | 'binance' | 'cash' = 'cash';

  // Tarifas (eventualmente vendrán del admin)
  motoFee = 2.00;
  carroFee = 4.00;
  deliveryFee = 0;
  grandTotal = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
      this.updateGrandTotal(); // Recalcula el total si el carrito cambia
    });
    // Establecer un método de entrega por defecto y calcular el total
    this.onDeliveryMethodChange('pickup');
  }

  onDeliveryMethodChange(method: 'pickup' | 'local_delivery' | 'national_shipping'): void {
    this.deliveryMethod = method;
    this.updateGrandTotal();
  }

  onLocalDeliveryTypeChange(type: 'moto' | 'carro'): void {
    this.localDeliveryType = type;
    this.updateGrandTotal();
  }

  updateGrandTotal(): void {
    if (this.deliveryMethod === 'local_delivery') {
      this.deliveryFee = this.localDeliveryType === 'moto' ? this.motoFee : this.carroFee;
    } else {
      this.deliveryFee = 0; // Envío nacional es cobro a destino
    }
    this.grandTotal = this.cartTotal + this.deliveryFee;
  }
}
