<?php

namespace App\Models\Accounts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

use App\Models\User;

class Address extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'street',
        'unit',
        'city_id',
        'is_billing',
        'postal_code',
    ];

    protected $casts = [
        'is_billing' => 'boolean',
        'is_default' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function makeDefault()
    {
        // Find any existing default addresses for the user and unset them
        $this->user->addresses()->where([
            ['is_default', true],
            ['is_billing', $this->is_billing]
        ])->update(['is_default' => false]);

        // Set the current address as default
        $this->is_default = true;
        $this->save();
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function province(): HasOneThrough
    {
        return $this->hasOneThrough(Province::class, City::class, 'id', 'id', 'city_id', 'province_id');
    }
}