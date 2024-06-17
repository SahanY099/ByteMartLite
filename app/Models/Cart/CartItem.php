<?php

namespace App\Models\Cart;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\Products\Product;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'quantity',
    ];

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function getTotal(): int
    {
        return $this->quantity * $this->product->price;
    }

    public function incrementQuantity(int $incrementBy): void
    {
        if ($incrementBy) {
            $this->increment('quantity', $incrementBy);
            return;
        }
        $this->increment('quantity');
    }

    public function decrementQuantity(int $decrementBy): void
    {
        if ($decrementBy) {
            $this->decrement('quantity', $decrementBy);
            return;
        }
        $this->decrement('quantity');
    }
}