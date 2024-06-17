<?php

namespace App\Models\Cart;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\User;

class Cart extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getTotal(): int
    {
        return $this->items->sum(function (CartItem $item) {
            return $item->getTotal();
        });
    }

}