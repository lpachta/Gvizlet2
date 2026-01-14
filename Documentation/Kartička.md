Protože kartička figuruje na více místech stránky, bylo by dobré ji mít jako modul. Kartičky se budou vkládat dynamicky.

Tento element se bude používat v několika používat v několika kontextech podle funkce:  
1. ***Běžné zobrazení kartičky*** - kartička zobrazuje svůj obsah
	- na stránce *Procvičování* 
	- finální vzhled kartičky
	- po kliknutí v *Procvičování* se otočí s pěknou animací
	- je vidět pouze jedna strana kartičky
	- obsah
		- obrázek - zobrazuje se pouze obrázek
		- text - zobrazuje se pouze text
		- obrázek + text - zobrazuje text i obrázek
		- bez obsahu - chybovy placeholder
	
2. ***Možnost přidání obsahu*** - kartička zobrazuje svůj obsah a placeholdery, kde obsah chybí
	- v *Editoru*
	- jdou vidět obě strany zároveň
	- po kliknutí na obsah nebo placeholder se spustí editování daného obsahu 
	- vedle vytvořeného obsahu je tlačítko na odstranění obsahu
	- kartička nabízející smazání nebo přidání obsahu 
	- po kliknutí v *Editoru* na text se přepne na *Editování textu kartičky*
	- po kliknutí v *Editoru* na obrázek vyskočí *podokno na vložení obrázku* 
	
3. ***Prázdná kartička*** - obsahuje placeholdery místo obsahu
	- v Editoru, když přidáme novou prázdnou kartičku, nebo odstraníme veškerý obsah

4. **Editování textu kartičky** - uživatel upravuje kartičku
	- v Editoru, po kliknutí na textový placeholder nebo na již zadaný text
	- kartička má místo placeholderu textové pole, které se rozšiřuje s obsahem

Kartička má dvě strany. Při kliknutí se otočí

# Návrh řešení

- kartička bude samostatný modul, který se bude vkládat do samotné stránky:
	- **JavaScript modul** - nativní
	- **React komponent** - vyžaduje celý React ekosystém
	
- kartička bude měnit svůj vzhled na základě toho, jestli obsahuje text 
	- **CSS** - nativní, pracné
	- **Bootstrap** - není závislé na zbytku aplikace, jednodušší, pravděpodobně již načtené prohlížečem

- kartička mění své chování podle kontextu použití:
	- **parametr při vytvoření** - struktura HTML se mění při samotném vytváření kartičky - obtížné změny stavu
	- **třídy** - HTML kartičky je stále stejné, pouze se mění třída - JS a CSS s různými třídami pracují jinak
	
- animace:
	- **CSS Transitions** - změna stavu, např.: po kliknutí nebo po přejetí kurzorem
	- **CSS Keyframe animace** - opakující se v cyklu, lze nastavit mezistavy
	- **JavaScript Action Triggers** - univerzálnější využití, vyžaduje JS
	- **CSS Transformations** - kombinování CSS animací selektory
	- **knihovny animací** - CSS knihovny, předchystané animace
	- **Scroll Animation** - stav závisí na pozici na stránce

- úprava textu:
	- **JS Event Listener** - po kliknutí se uloží text a vloží se místo něj textové pole

- úprava obrázku:
	- **JS Event Listener** - objekt čeká na nějakou z přidaných akcí - konkrétně drop
	- **JS zobrazení** - src se nastaví na cestu vloženého obrázku

# Popis implementace

