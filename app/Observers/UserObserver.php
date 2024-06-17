<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        $user->cart()->create();
    }

    /**
     * Handle the User "restored" event.
     */
    public function deleting(User $user): void
    {
        $user->cart()->delete();
    }
}
