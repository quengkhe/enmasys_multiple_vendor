/** @odoo-module **/
import { Component, useState, useRef, onWillUnmount } from "@odoo/owl";
import { registry } from "@web/core/registry"

const defaultPos = 0;
export class FlashDeal extends Component {

    static template = "enmasys_multiple_vendor.FlashDeal";
    static props = {};

    setup() {
        this.products = useState([
            { id: 0, name: "Porsche Cayenne", price_old: "84,700", price_new: "82,500", rating: '3', img: 'car' },
            { id: 1, name: "Porsche Macan", price_old: "75,300", price_new: "74,300", rating: '5', img: 'drone' },
            { id: 2, name: "Shoes", price_old: "102,800", price_new: "101,000", rating: '1', img: 'shoes' },
            { id: 3, name: "Bag", price_old: "12.000", price_new: "10,000", rating: '2', img: 'bag' },
            { id: 4, name: "Statue", price_old: "120", price_new: "110", rating: '4', img: 'statue' },
            { id: 5, name: "Xbox", price_old: "100", price_new: "90", rating: '5', img: 'xbox' },
            { id: 6, name: "Earings", price_old: "12.000", price_new: "10.999", rating: '2', img: 'earings' },
            { id: 7, name: "Makeup Box", price_old: "300", price_new: "250", rating: '0', img: 'makeup' },
            { id: 8, name: "Headphone", price_old: "900", price_new: "560", rating: '0', img: 'headphone' },
        ]);
        this.upsaleProducts = useState([
            { id: 0, name: "Makeup Box", price_old: "381.77", price_new: "195.77", rating: '0', inStock: 23, img: 'makeup' },
            { id: 1, name: "Drone", price_old: "266.00", price_new: "199.99", rating: '4', inStock: 12, img: 'drone' },
        ]);
        this.timeRemaining = useState({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });

        // For dragging
        this.leftVal = useState({ value: defaultPos });
        this.pos1 = useState({ value: 0 });
        this.pos3 = useState({ value: 0 });
        this.sliderRef = useRef("sliderRef");

        // Set day til now to 7 days
        // this.endDate = new Date();
        // this.endDate.setDate(this.endDate.getDate() + 7);

        // Or just set a specific date
        this.endDate = new Date("2024-12-31");
        this.startTimer();
        onWillUnmount(() => this.stopTimer());
    }
    generateStars(rating) {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push({
                index: i,
                type: i < rating ? "fas fa-star" : "far fa-star", // Filled or empty star
            });
        }
        return stars;
    }
    startTimer() {
        this.timer = setInterval(() => {
            const now = new Date();
            const diff = this.endDate - now;

            if (diff <= 0) {
                this.stopTimer();
                this.timeRemaining.days = 0;
                this.timeRemaining.hours = 0;
                this.timeRemaining.minutes = 0;
                this.timeRemaining.seconds = 0;
            } else {
                this.timeRemaining.days = Math.floor(diff / (1000 * 60 * 60 * 24));
                this.timeRemaining.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                this.timeRemaining.minutes = Math.floor((diff / (1000 * 60)) % 60);
                this.timeRemaining.seconds = Math.floor((diff / 1000) % 60);
            }
        }, 1000);
    }

    // Stop the timer
    stopTimer() {
        clearInterval(this.timer);
    }
}
registry.category("public_components").add("enmasys_multiple_vendor.FlashDeal", FlashDeal);
