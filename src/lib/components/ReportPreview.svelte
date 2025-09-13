<script>
  import HeatMapSection from './HeatMapSection.svelte';
  import CompetitorAnalysis from './CompetitorAnalysis.svelte';
  import DemographicsSection from './DemographicsSection.svelte';
  import RentalPricesSection from './RentalPricesSection.svelte';
  import RecommendationsSection from './RecommendationsSection.svelte';
  import PaymentModal from './PaymentModal.svelte';
  
  let { searchParams, isPaid, onPayment, onBack } = $props();
  let showPaymentModal = $state(false);
  
  // Mock data для демонстрации
  const mockData = {
    totalCompetitors: 127,
    averageRating: 4.2,
    topDistricts: ['Центральный', 'Арбат', 'Тверской'],
    averageRent: 3500,
    bestLocations: [
      { address: 'ул. Тверская, 15', score: 9.2, reason: 'Высокая проходимость' },
      { address: 'Новый Арбат, 24', score: 8.8, reason: 'Близость к метро' },
      { address: 'ул. Петровка, 38', score: 8.5, reason: 'Мало конкурентов' }
    ]
  };
  
  function handlePaymentClick() {
    showPaymentModal = true;
  }
  
  function handlePaymentSuccess() {
    showPaymentModal = false;
    onPayment();
  }
  
  function handlePaymentCancel() {
    showPaymentModal = false;
  }
</script>

<div class="min-h-screen bg-background">
  <!-- Report Header -->
  <div class="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-serif font-bold mb-4">
          Анализ локации для {searchParams.category}
        </h1>
        <p class="text-xl opacity-90 mb-6">
          {searchParams.city} • Сгенерировано {new Date().toLocaleDateString('ru-RU')}
        </p>
        
        {#if !isPaid}
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
            <div class="flex items-center justify-center mb-2">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
              </svg>
              Демо-версия отчета
            </div>
            <p class="text-sm opacity-80">
              Вы видите ограниченную версию. Разблокируйте полный отчет для получения всех данных и рекомендаций.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Quick Stats -->
  <div class="py-8 bg-card/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-foreground mb-2">
            {isPaid ? mockData.totalCompetitors : '12+'}
          </div>
          <div class="text-sm text-muted">Конкурентов найдено</div>
        </div>
        
        <div class="text-center">
          <div class="text-3xl font-bold text-foreground mb-2">
            {isPaid ? mockData.averageRating : '4.0+'}
          </div>
          <div class="text-sm text-muted">Средний рейтинг</div>
        </div>
        
        <div class="text-center">
          <div class="text-3xl font-bold text-foreground mb-2">
            {isPaid ? mockData.topDistricts.length : '3+'}
          </div>
          <div class="text-sm text-muted">Районов проанализировано</div>
        </div>
        
        <div class="text-center">
          <div class="text-3xl font-bold text-foreground mb-2">
            {isPaid ? `₽${mockData.averageRent}` : '₽3000+'}
          </div>
          <div class="text-sm text-muted">Средняя аренда за м²</div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Report Sections -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
    
    <!-- Heat Map Section -->
    <section class="relative">
      <HeatMapSection searchParams={searchParams} isPaid={isPaid} />
      
      {#if !isPaid}
        <div class="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none"></div>
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <button 
            onclick={handlePaymentClick}
            class="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Разблокировать интерактивную карту
          </button>
        </div>
      {/if}
    </section>
    
    <!-- Competitor Analysis -->
    <section class="relative">
      <CompetitorAnalysis searchParams={searchParams} isPaid={isPaid} />
      
      {#if !isPaid}
        <div class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center bg-card/90 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-border max-w-md">
            <div class="text-4xl mb-4">🔒</div>
            <h3 class="text-xl font-serif font-bold text-foreground mb-3">
              Детальный анализ конкурентов
            </h3>
            <p class="text-muted mb-6">
              Получите полную информацию о всех {mockData.totalCompetitors} конкурентах, их рейтингах, отзывах и слабых местах
            </p>
            <button 
              onclick={handlePaymentClick}
              class="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Открыть за ₽2,990
            </button>
          </div>
        </div>
      {/if}
    </section>
    
    <!-- Demographics Section -->
    <section class="relative">
      <DemographicsSection searchParams={searchParams} isPaid={isPaid} />
      
      {#if !isPaid}
        <div class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent"></div>
        <div class="absolute bottom-4 right-4">
          <div class="bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg text-sm font-medium">
            Только в полной версии
          </div>
        </div>
      {/if}
    </section>
    
    <!-- Rental Prices Section -->
    <section class="relative">
      <RentalPricesSection searchParams={searchParams} isPaid={isPaid} />
      
      {#if !isPaid}
        <div class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent"></div>
        <div class="absolute bottom-4 right-4">
          <div class="bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg text-sm font-medium">
            Только в полной версии
          </div>
        </div>
      {/if}
    </section>
    
    <!-- Recommendations Section -->
    <section class="relative">
      <RecommendationsSection searchParams={searchParams} isPaid={isPaid} mockData={mockData} />
      
      {#if !isPaid}
        <div class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center bg-gradient-to-br from-accent to-secondary p-1 rounded-xl max-w-lg">
            <div class="bg-background rounded-lg p-8">
              <div class="text-4xl mb-4">🎯</div>
              <h3 class="text-2xl font-serif font-bold text-foreground mb-3">
                Персональные рекомендации
              </h3>
              <p class="text-muted mb-6">
                Получите список из {mockData.bestLocations.length}+ лучших адресов с детальным обоснованием выбора каждой локации
              </p>
              <div class="space-y-2 mb-6">
                {#each mockData.bestLocations.slice(0, 2) as location}
                  <div class="flex items-center justify-between bg-card/50 rounded-lg p-3">
                    <span class="font-medium">{location.address}</span>
                    <span class="text-accent font-bold">★ {location.score}</span>
                  </div>
                {/each}
                <div class="text-muted text-sm">+ еще {mockData.bestLocations.length - 2} локации</div>
              </div>
              <button 
                onclick={handlePaymentClick}
                class="w-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Получить все рекомендации за ₽2,990
              </button>
            </div>
          </div>
        </div>
      {/if}
    </section>
  </div>
  
  <!-- Sticky Payment CTA -->
  {#if !isPaid}
    <div class="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 shadow-2xl z-50">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <div class="font-semibold">Разблокируйте полный отчет</div>
          <div class="text-sm opacity-90">Все данные, интерактивные карты и персональные рекомендации</div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-right">
            <div class="text-2xl font-bold">₽2,990</div>
            <div class="text-sm opacity-75 line-through">₽4,990</div>
          </div>
          <button 
            onclick={handlePaymentClick}
            class="bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Купить отчет
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- Payment Modal -->
{#if showPaymentModal}
  <PaymentModal 
    onSuccess={handlePaymentSuccess}
    onCancel={handlePaymentCancel}
  />
{/if}
