<script lang="ts">
  

  let { searchParams, isPaid } = $props();
  let selectedCompetitor = $state(null);
  
  const limitedCompetitors = [
    { name: 'Кофе Хауз', rating: 4.2, reviews: 156, distance: '0.3 км' },
    { name: 'Старбакс', rating: 4.0, reviews: 89, distance: '0.5 км' },
    { name: 'Шоколадница', rating: 3.8, reviews: 234, distance: '0.7 км' }
  ];
  
  const fullCompetitors = [
    {
      name: 'Кофе Хауз',
      rating: 4.2,
      reviews: 156,
      distance: '0.3 км',
      avgCheck: 380,
      workingHours: '7:00-23:00',
      website: 'coffeehouse.ru',
      phone: '+7 (495) 123-45-67',
      strengths: ['Узнаваемый бренд', 'Широкое меню', 'Удобное расположение'],
      weaknesses: ['Высокие цены', 'Долгое ожидание', 'Шумно']
    },
    {
      name: 'Старбакс',
      rating: 4.0,
      reviews: 89,
      distance: '0.5 км',
      avgCheck: 420,
      workingHours: '6:30-22:30',
      website: 'starbucks.ru',
      phone: '+7 (495) 234-56-78',
      strengths: ['Международный бренд', 'Качественный кофе', 'Wi-Fi'],
      weaknesses: ['Очень высокие цены', 'Мало места', 'Стандартизированность']
    },
    {
      name: 'Шоколадница',
      rating: 3.8,
      reviews: 234,
      distance: '0.7 км',
      avgCheck: 320,
      workingHours: '8:00-22:00',
      website: 'shoko.ru',
      phone: '+7 (495) 345-67-89',
      strengths: ['Доступные цены', 'Большие порции', 'Уютная атмосфера'],
      weaknesses: ['Устаревший интерьер', 'Медленное обслуживание', 'Ограниченное меню']
    },
    {
      name: 'Кофемания',
      rating: 4.1,
      reviews: 92,
      distance: '0.4 км',
      avgCheck: 350,
      workingHours: '7:30-23:30',
      website: 'coffeemania.ru',
      phone: '+7 (495) 456-78-90',
      strengths: ['Авторские напитки', 'Стильный интерьер', 'Быстрое обслуживание'],
      weaknesses: ['Ограниченные места', 'Высокая конкуренция', 'Дорогая еда']
    },
    {
      name: 'Даблби',
      rating: 3.9,
      reviews: 67,
      distance: '0.6 км',
      avgCheck: 290,
      workingHours: '8:00-21:00',
      website: 'doubleb.ru',
      phone: '+7 (495) 567-89-01',
      strengths: ['Низкие цены', 'Быстрое обслуживание', 'Много мест'],
      weaknesses: ['Простой интерьер', 'Ограниченное меню', 'Шумно']
    }
  ];
  
  function selectCompetitor(competitor) {
    selectedCompetitor.set(selectedCompetitor.get()?.name === competitor.name ? null : competitor);
  }
</script>

<div class="bg-card rounded-xl p-6 shadow-lg border border-border">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-2xl font-serif font-bold text-foreground">
      Анализ конкурентов
    </h2>
    {#if isPaid}
      <div class="text-sm text-muted">
        Найдено {fullCompetitors.length} основных конкурентов
      </div>
    {/if}
  </div>
  
  <div class="space-y-4">
    {#each (isPaid ? fullCompetitors : limitedCompetitors) as competitor}
      <div class="border border-border rounded-lg overflow-hidden">
        <button 
          onclick={() => isPaid && selectCompetitor(competitor)}
          class="w-full flex items-center justify-between p-4 bg-background hover:bg-muted/30 transition-colors {isPaid ? 'cursor-pointer' : 'cursor-default'}"
        >
          <div class="flex items-center space-x-4">
            <div>
              <div class="font-medium text-foreground text-left">{competitor.name}</div>
              <div class="text-sm text-muted text-left">{competitor.distance} от центра</div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="flex items-center">
                <span class="text-yellow-500 mr-1">★</span>
                <span class="font-medium">{competitor.rating}</span>
              </div>
              <div class="text-sm text-muted">{competitor.reviews} отзывов</div>
            </div>
            {#if isPaid}
              <svg class="w-5 h-5 text-muted transform transition-transform {selectedCompetitor.get()?.name === competitor.name ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            {/if}
          </div>
        </button>
        
        {#if isPaid && selectedCompetitor.get()?.name === competitor.name}
          <div class="border-t border-border p-4 bg-muted/10">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-foreground mb-3">Основная информация</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-muted">Средний чек:</span>
                    <span class="font-medium">₽{competitor.avgCheck}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted">Режим работы:</span>
                    <span class="font-medium">{competitor.workingHours}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted">Сайт:</span>
                    <a href="https://{competitor.website}" class="text-accent hover:underline">{competitor.website}</a>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted">Телефон:</span>
                    <span class="font-medium">{competitor.phone}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="font-semibold text-foreground mb-3">Анализ сильных и слабых сторон</h4>
                <div class="space-y-3">
                  <div>
                    <div class="text-sm font-medium text-green-600 mb-1">Сильные стороны:</div>
                    <ul class="text-sm text-muted space-y-1">
                      {#each competitor.strengths as strength}
                        <li class="flex items-center">
                          <svg class="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                          </svg>
                          {strength}
                        </li>
                      {/each}
                    </ul>
                  </div>
                  
                  <div>
                    <div class="text-sm font-medium text-red-600 mb-1">Слабые стороны:</div>
                    <ul class="text-sm text-muted space-y-1">
                      {#each competitor.weaknesses as weakness}
                        <li class="flex items-center">
                          <svg class="w-3 h-3 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                          </svg>
                          {weakness}
                        </li>
                      {/each}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/each}
    
    {#if !isPaid}
      <div class="text-center py-4 text-muted">
        + еще 124 конкурента в полной версии
      </div>
    {/if}
  </div>
  
  {#if isPaid}
    <div class="mt-6 p-4 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg border border-accent/20">
      <h4 class="font-semibold text-foreground mb-3">Анализ рынка</h4>
      <div class="grid md:grid-cols-3 gap-4 text-sm">
        <div>
          <div class="font-medium text-foreground">Уровень конкуренции</div>
          <div class="text-destructive">Высокий (73%)</div>
          <div class="text-muted mt-1">Рынок насыщен, требуется уникальное позиционирование</div>
        </div>
        <div>
          <div class="font-medium text-foreground">Средний чек конкурентов</div>
          <div class="text-accent">₽350</div>
          <div class="text-muted mt-1">Диапазон от ₽280 до ₽420</div>
        </div>
        <div>
          <div class="font-medium text-foreground">Возможности</div>
          <div class="text-green-600">Есть ниши</div>
          <div class="text-muted mt-1">Недостаток заведений с уютной атмосферой</div>
        </div>
      </div>
    </div>
  {/if}
</div>
