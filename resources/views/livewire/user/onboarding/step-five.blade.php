<div>
    <div class="mb-6">
        <x-auth.form.input 
            name="name" 
            wire:model.trim.debounce.500ms.live="name"
            defaultValue="{{ $name }}"
        placeholder="Workspace Name"></x-auth.form.input>

        <div class="flex flex-col gap-3 max-w-xs mt-4 mb-4">
            <h2 class="text-white">Visibility Scope</h2>
            <label for="visibility_scope_public"
                class="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20 text-white cursor-pointer hover:bg-white/20 transition">
                <input
                    type="radio"
                    name="visibility_scope"
                    id="visibility_scope_public"
                    value="public"
                    wire:model="visibility_scope"
                    class="w-5 h-5 text-blue-400 focus:ring-blue-300"
                >
                <span>Public</span>
            </label>

            <label for="visibility_scope_friends"
                class="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20 text-white cursor-pointer hover:bg-white/20 transition">
                <input
                    type="radio"
                    name="visibility_scope"
                    id="visibility_scope_friends"
                    value="friends"
                    wire:model="visibility_scope"
                    class="w-5 h-5 text-blue-400 focus:ring-blue-300"
                >
                <span>Friends</span>
            </label>

            <label for="visibility_scope_private"
                class="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20 text-white cursor-pointer hover:bg-white/20 transition">
                <input
                    type="radio"
                    name="visibility_scope"
                    id="visibility_scope_private"
                    value="private"
                    wire:model="visibility_scope"
                    class="w-5 h-5 text-blue-400 focus:ring-blue-300"
                >
                <span>Private</span>
            </label>

        </div>


        <x-auth.form.input
            name="description"
            wire:model.live.debounce.500ms="description"
            placeholder="Description"
        >
        </x-auth.form.input>

        <p class="text-cap-l text-lab-sc mt-2">
            {{ __('labels.choose_username_helper')}}
        </p>
    </div>

    <div class="mb-4">
        <div class="block w-full" wire:loading.remove>
            <x-auth.buttons.primary type="button" wire:click="submitForm">
                {{ __('labels.continue') }}

                <x-slot:icon>
                    <x-ui-icon name="arrow-narrow-right" type="solid"></x-ui-icon>
                </x-slot:icon>
            </x-auth.buttons.primary>
        </div>
        
        <div class="block w-full" wire:loading>
            <x-auth.buttons.loading>
            </x-auth.buttons.loading>
        </div>
    </div>
</div>