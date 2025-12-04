<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Workspace - {{ config('app.name') }}</title>
    
    @vite('Modules/Workspace/Resources/assets/sass/app.scss')
</head>
<body>
    <div id="workspace-app"></div>
    
    <script>
        window.Laravel = {
            csrfToken: '{{ csrf_token() }}',
            user: @json(auth()->user()),
            apiUrl: '{{ url("api") }}',
        };
    </script>
    
    @vite('Modules/Workspace/Resources/assets/js/app.js')
</body>
</html>

