<script lang="ts">
  
  let { searchParams, isPaid, mockData } = $props();
  
  const fullRecommendations = [
    {
      address: 'ул. Тверская, 15',
      score: 9.2,
      reason: 'Высокая проходимость и престижное расположение',
      details: {
        footTraffic: 18000,
        competition: 'Низкая',
        rent: 4800,
        metroDistance: 2,
        targetAudience: 'Офисные работники, туристы',
        pros: ['Центр города', 'Много офисов рядом', 'Туристический поток'],
        cons: ['Высокая аренда', 'Сложная парковка'],
        roi: '18 месяцев'
      }
    },
    {
      address: 'Новый Арбат, 24',
      score: 8.8,
      reason: 'Отличная транспортная доступность',
      details: {
        footTraffic: 15000,
        competition: 'Средняя',
        rent: 4200,
        metroDistance: 1,
        targetAudience: 'Молодежь, студенты, офисные работники',
        pros: ['Рядом с метро', 'Молодая аудитория', 'Разумная аренда'],
        cons: ['Средняя конкуренция', 'Шумная улица'],
        roi: '22 месяца'
      }
    },
    {
      address: 'ул. Петровка, 38',
      score: 8.5,
      reason: 'Низкая конкуренция при хорошей проходимости',
      details: {
        footTraffic: 12000,
        competition: 'Низкая',
        rent: 3800,
        metroDistance: 5,
        targetAudience: 'Местные жители, офисные работники',
        pros: ['Мало конкурентов', 'Доступная аренда', 'Стабильный поток'],
        cons: ['Дальше от метро', 'Меньше туристов'],
        roi: '20 месяцев'
      }
    },
    {
      address: 'ул. Остоженка, 12',
      score: 8.2,
      reason: 'Премиальный район с платежеспособной аудиторией',
      details: {
        footTraffic: 8000,
        competition: 'Низкая',
        rent: 5200,
        metroDistance: 7,
        targetAudience: 'Состоятельные жители, бизнесмены',
        pros: ['Высокие доходы района', 'Мало конкурентов', 'Лояльная аудитория'],
        cons: ['Высокая аренда', 'Меньший поток', 'Далеко от метро'],
        roi: '24 месяца'
      }
    },
    {
      address: 'Садовое кольцо, 45',
      score: 7.9,
      reason: 'Развивающийся район с растущим потенциалом',
      details: {
        footTraffic: 10000,
        competition: 'Средняя',
        rent: 3500,
        metroDistance: 4,
        targetAudience: 'Местные жители, проезжающие',
        pros: ['Низкая аренда', 'Растущий район', 'Хорошая видимость'],
        cons: ['Средняя конкуренция', 'Транзитный поток'],
        roi: '26 месяцев'
      }
    }
  ];
  
  let selectedLocation = $state(null);
  
  function selectLocation(location) {
    selectedLocation = selectedLocation?.address === location.address ? null : location;
  }
</script>

<div class="bg-card rounded-xl p-6 shadow-lg border border-border">
  <h2 class="text-2xl font-serif font-bold text-foreground mb-4">
    Персональные рекомендации локаций
  </h2>
  
  <div class="space-y-4">
    {#each (isPaid ? fullRecommendations : mockData.bestLocations.slice(0, 1)) as location}
      <div class="border border-border rounded-lg overflow-hidden">
        <button 
          onclick={() => isPaid && selectLocation(location)}
          class="w-full p-4 bg-gradient-to-r from-accent/10 to-secondary/10 hover:from-accent/20 hover:to-secondary/20 transition-all {isPaid ? 'cursor-pointer' : 'cursor-default'}"
        >
          <div class="flex items-center justify-between">
            <div class="text-left">
              <div class="font-semibold text-foreground text-lg">{location.address}</div>
              <div class="text-muted text-sm mt-1">{location.reason}</div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="flex items-center bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                ★ {location.score}
              </div>
              {#if isPaid}
                <svg class="w-5 h-5 text-muted transform transition-transform {selectedLocation?.address === location.address ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              {/if}
            </div>
          </div>
        </button>
        
        {#if isPaid && selectedLocation?.address === location.address}
          <!-- Added detailed location analysis for paid version -->
          <div class="border-t border-border p-6 bg-background">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-foreground mb-4">Ключевые метрики</h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-muted">Проходимость</span>
                    <span class="font-medium">{location.details.footTraffic.toLocaleString()} чел/день</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-muted">Конкуренция</span>
                    <span class="font-medium {location.details.competition === 'Низкая' ? 'text-green-600' : location.details.competition === 'Средняя' ? 'text-yellow-600' : 'text-red-600'}">{location.details.competition}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-muted">Аренда</span>
                    <span class="font-medium">₽{location.details.rent.toLocaleString()}/м²</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-muted">До метро</span>
                    <span class="font-medium">{location.details.metroDistance} мин</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-muted">Окупаемость</span>
                    <span class="font-medium text-accent">{location.details.roi}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="font-semibold text-foreground mb-4">Целевая аудитория</h4>
                <p class="text-muted mb-4">{location.details.targetAudience}</p>
                
                <div class="space-y-3">
                  <div>
                    <div class="text-sm font-medium text-green-600 mb-2">Преимущества:</div>
                    <ul class="text-sm text-muted space-y-1">
                      {#each location.details.pros as pro}
                        <li class="flex items-center">
                          <svg class="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                          </svg>
                          {pro}
                        </li>
                      {/each}
                    </ul>
                  </div>
                  
                  <div>
                    <div class="text-sm font-medium text-red-600 mb-2">Недостатки:</div>
                    <ul class="text-sm text-muted space-y-1">
                      {#each location.details.cons as con}
                        <li class="flex items-center">
                          <svg class="w-3 h-3 text-red-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                          </svg>
                          {con}
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
      <div class="text-center py-6 text-muted border-2 border-dashed border-border rounded-lg">
        + еще {fullRecommendations.length - 1} персональные рекомендации в полной версии
      </div>
    {/if}
  </div>
  
  {#if isPaid}
    <!-- Added export and summary features for paid version -->
    <div class="mt-6 flex items-center justify-between p-4 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg border border-accent/20">
      <div>
        <h4 class="font-semibold text-foreground">Готовы к запуску?</h4>
        <p class="text-sm text-muted">Экспортируйте отчет в PDF или получите персональную консультацию</p>
      </div>
      <div class="flex space-x-3">
        <button class="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Скачать PDF
        </button>
        <button class="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Консультация
        </button>
      </div>
    </div>
  {/if}
</div>
