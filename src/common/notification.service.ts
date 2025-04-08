import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import * as nodemailer from 'nodemailer';
import { messages } from './constant';

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });
  }

  async sendBookingConfirmationEmail(customerEmail: string, bookingDetails: any) {
    const mailOptions = {
      from: process.env.BREVO_SMTP_FROM,
      to: customerEmail,
      subject: 'Booking Confirmation - Vehicle Management System',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #0769b4;
              color: white;
              padding: 5px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 20px;
              border: 1px solid #ddd;
              border-top: none;
              border-radius: 0 0 5px 5px;
            }
            .booking-details {
              background-color: white;
              padding: 20px;
              border-radius: 5px;
              margin: 20px 0;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: bold;
              color: black;
            }
            .value {
              color: #666;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #666;
              font-size: 0.9em;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #3498db;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h4>Booking Confirmation</h4>
            </div>
            
            <div class="content">
              <p>Dear ${bookingDetails.customer.name},</p>
              
              <p>Thank you for choosing our vehicle management service. Your booking has been confirmed successfully.</p>
              
              <div class="booking-details">
                <h3>Booking Details</h3>
                <div class="detail-row">
                  <span class="label">Invoice Number:</span>
                  <span class="value">${bookingDetails.invoiceNo}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Start Date:</span>
                  <span class="value">${new Date(bookingDetails.tripStartDate).toLocaleDateString()}</span>
                </div>
                <div class="detail-row">
                  <span class="label">End Date:</span>
                  <span class="value">${new Date(bookingDetails.tripEndDate).toLocaleDateString()}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Start Location:</span>
                  <span class="value">${bookingDetails.tripStartLoc}</span>
                </div>
                <div class="detail-row">
                  <span class="label">End Location:</span>
                  <span class="value">${bookingDetails.tripEndLoc}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Vehicle:</span>
                  <span class="value">${bookingDetails.vehicle.vehicleName}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Total Amount:</span>
                  <span class="value">₹${bookingDetails.totalAmt}</span>
                </div>
              </div>

              <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            </div>

            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
              <p>© ${new Date().getFullYear()} Vehicle Management System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error(messages.failed_email, error);
      return false;
    }
  }
} 