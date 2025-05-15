<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul>
        @foreach ($quizes as $quiz)
            <li>
                <a href="{{ route('caueex', $quiz->id) }}">{{ $quiz->name }}</a>
                <a href="{{ route('caueex', $quiz->id) }}">{{ $quiz->description }}</a>
                <a href="{{ route('caueex', $quiz->id) }}">{{ $quiz->level }}</a>
                <a href="{{ route('caueex', $quiz->id) }}">{{ $quiz->xp }}</a>
                <form action="{{ route('quiz.delete', $quiz->id) }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Deletar</button>
                </form>
            </li>
        @endforeach
    </ul>
    <x-alert />
    <form action="{{ route('quiz.create') }}" method="POST">
        @csrf
        <label for="">Nome:</label>
        <input type="text" name="name" id="">
        <label for="">Descrição:</label>
        <input type="text" name="description" id="description">
        <label for="">Nível:</label>
        <input type="number" name="level" id="level">
        <label for="">XP:</label>
        <input type="number" name="xp" id="xp">
        <button type="submit">Enviar</button>
    </form>
</body>

</html>
