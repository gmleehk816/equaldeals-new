<?php

namespace App\Livewire\User\Onboarding;

use App\Models\Workspace;
use App\Models\User;
use Livewire\Component;
use Illuminate\Support\Str;
use App\Enums\User\UserStatus;
use Illuminate\Validation\Rule;

class StepFive extends Component
{
    public string $name = '';
    public string $visibility_scope = 'private';
    public string $description = '';

    public function mount()
    {
        // Initialize with defaults if needed
    }

    public function render()
    {
        return view('livewire.user.onboarding.step-five');
    }

    public function submitForm()
    {
        $this->validate(rules: [
            'name' => 'required|string|max:255',
            'visibility_scope' => 'required',
            'description' => 'required|string|max:500',
        ]);

        $user = me();

        $user->workspace()->create([
            'user_id' => $user->id,
            'name' => $this->name,
            'visibility_scope' => $this->visibility_scope,
            'description' => $this->description,
        ]);

        $this->redirect(route('user.desktop.index'));
    }
}
