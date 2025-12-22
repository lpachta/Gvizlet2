Výuková aplikace ve stylu Quizletu. 

> HTML5 část
> Pomocí HTML5, CSS3, JavaScriptu a volitelně SVG vytvoř webovou aplikaci používající karty pro podporu výuky. Může to být něco ve stylu pexesa, kartiček pro výuku slovíček apod. Hra by měla umět:
> - animovat otáčení hracích karet při výběru - rub -> líc a opačně,
> - uhodnuté karty by měly umět z hracího pole zmizet,
> - počítat úspěšné a neúspěšné pokusy,
> - výuková data se budou náhodně míchat,
> - výuková data se budou načítat ze serveru.
> 
> PHP+SQL část
> Součástí aplikace bude formulář pro vkládání výukových dat. Použij PHP a data ukládej do MySQL databáze.
> 
> Hodnotit se bude také originalita návrhu.
> Studenti z neprogramátorských tříd se mohou více zaměřit na části tvořené pomocí HTML a CSS, neočekávám u nich příliš sofistikované algoritmy v JavaScriptu (i když nějaký kód asi bude nutné použít).
> 
> Součástí hodnocení bude také obhajoba, ze které musí být zřejmé, že svému řešení rozumíte.

**Kartička** - obsahuje obrázek anebo text

**Editor** - slouží tvoření setů
- každý set se skládá z kartiček
- v editoru se dají přidávat a mazat kartičky

Sety se ukládají do databáze

**Procvičování** - prohlížení kartiček
- při kliknutí na kartičku se pěkně otočí
- při potáhnutí na stranu se responzivně nakloní, jako v originální aplikaci
- sety se dají míchat, měnit základní otočení a označení kartiček hvězdou
