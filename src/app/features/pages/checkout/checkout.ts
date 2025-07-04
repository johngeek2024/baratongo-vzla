import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class Checkout implements OnInit {
  cartTotal: number = 0;
  readonly deliveryMinAmount = 10;

  deliveryMethod: 'pickup' | 'local_delivery' | 'national_shipping' | null = null;
  localDeliveryType: 'moto' | 'carro' = 'moto';

  deliveryFee = 0;
  grandTotal = 0;

  motoFee = 2.00;
  carroFee = 4.00;

  checkoutForm: FormGroup;

  constructor(private cartService: CartService, private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      name: [''],
      phone: [''],
      deliveryMethod: [null],
      pickupPoint: ['luz'],
      localAddress: [''],
      localDeliveryType: ['moto'],
      nationalAddress: [''],
      nationalCourier: ['mrw'],
      paymentMethod: ['cash']
    });
  }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
      this.updateGrandTotal();
    });
  }

  onDeliveryMethodChange(method: 'pickup' | 'local_delivery' | 'national_shipping'): void {
    this.deliveryMethod = method;
    this.updateDeliveryFee();
    this.updateGrandTotal();
  }

  onLocalDeliveryTypeChange(type: 'moto' | 'carro'): void {
    this.localDeliveryType = type;
    this.updateDeliveryFee();
    this.updateGrandTotal();
  }

  updateDeliveryFee(): void {
    if (this.deliveryMethod === 'local_delivery') {
      this.deliveryFee = this.localDeliveryType === 'moto' ? this.motoFee : this.carroFee;
    } else {
      this.deliveryFee = 0;
    }
  }

  updateGrandTotal(): void {
    this.grandTotal = this.cartTotal + this.deliveryFee;
  }
}
