<script lang="ts">
  import { onMount } from 'svelte';
  
  let { onStartAnalysis } = $props();
  
  let category = $state('');
  let city = $state('');
  let isLoading = $state(false);
  
  const categories = [
    'Кофейня', 'Ресторан', 'Ювелирная мастерская', 'Салон красоты', 
    'Фитнес-клуб', 'Стоматология', 'Аптека', 'Магазин одежды',
    'Автосервис', 'Пекарня', 'Барбершоп', 'Детский центр'
  ];
  
  const cities = [
    'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург',
    'Казань', 'Нижний Новгород', 'Челябинск', 'Самара',
    'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск'
  ];
  
  function handleSubmit() {
    if (!category || !city) return;
    
    isLoading = true;
    
    setTimeout(() => {
      onStartAnalysis({ category, city });
      isLoading = false;
    }, 500);
  }
  
  let heroRef = $state();
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  });
</script>

<div class="relative overflow-hidden">
  <!-- Hero Section -->
  <section bind:this={heroRef} class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-background">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style="animation-delay: -3s;"></div>
      <div class="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" style="animation-delay: -1.5s;"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
        <h1 class="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 text-balance">
          Найдите <span class="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent animate-gradient">идеальное место</span> для вашего бизнеса
        </h1>
        
        <p class="text-xl md:text-2xl text-muted mb-12 max-w-3xl mx-auto text-pretty">
          Профессиональная аналитика локаций на основе данных о конкурентах, демографии и инфраструктуре. 
          Принимайте решения на основе фактов, а не догадок.
        </p>
      </div>
      
      <!-- Search Form -->
      <div class="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-300">
        <div class="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border max-w-2xl mx-auto animate-pulse-glow">
          <h3 class="text-2xl font-serif font-bold text-card-foreground mb-6">Получите анализ за 2 минуты</h3>
          
          <div class="space-y-4">
            <div>
              <label for="category" class="block text-sm font-medium text-card-foreground mb-2">Тип бизнеса</label>
              <select id="category" bind:value={category} class="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all">
                <option value="">Выберите категорию</option>
                {#each categories as cat}
                  <option value={cat}>{cat}</option>
                {/each}
              </select>
            </div>
            
            <div>
              <label for="city" class="block text-sm font-medium text-card-foreground mb-2">Город</label>
              <select id="city" bind:value={city} class="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all">
                <option value="">Выберите город</option>
                {#each cities as c}
                  <option value={c}>{c}</option>
                {/each}
              </select>
            </div>
            
            <button 
              onclick={handleSubmit}
              disabled={!category || !city || isLoading}
              class="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {#if isLoading}
                <div class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                  Анализируем...
                </div>
              {:else}
                Получить анализ локации
              {/if}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Features Section -->
  <section class="py-24 bg-card/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
          Что вы получите в отчете
        </h2>
        <p class="text-xl text-muted max-w-3xl mx-auto">
          Комплексный анализ, который поможет принять правильное решение о размещении бизнеса
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each [
          {
            icon: '🗺️',
            title: 'Тепловая карта конкурентов',
            description: 'Интерактивная карта с плотностью организаций вашей категории и их рейтингами'
          },
          {
            icon: '📊',
            title: 'Анализ районов',
            description: 'Демография, средний доход жителей, проходимость и транспортная доступность'
          },
          {
            icon: '💰',
            title: 'Стоимость аренды',
            description: 'Актуальные цены за м² коммерческой недвижимости по всем улицам и районам'
          },
          {
            icon: '🚇',
            title: 'Близость к метро',
            description: 'Расстояние до станций метро и влияние на проходимость локации'
          },
          {
            icon: '⭐',
            title: 'Рейтинги и отзывы',
            description: 'Анализ конкурентов: оценки, количество отзывов, сильные и слабые стороны'
          },
          {
            icon: '🎯',
            title: 'Рекомендации',
            description: 'Конкретные адреса с обоснованием почему именно там стоит открыть бизнес'
          }
        ] as feature, index}
          <div class="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-border" style="animation-delay: {index * 100}ms;">
            <div class="text-4xl mb-4">{feature.icon}</div>
            <h3 class="text-xl font-serif font-bold text-card-foreground mb-3">{feature.title}</h3>
            <p class="text-muted">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Social Proof Section -->
  <section class="py-24 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
          Нам доверяют предприниматели
        </h2>
        <p class="text-xl text-muted">
          Более 500 успешных бизнесов открыто с нашими рекомендациями
        </p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        {#each [
          {
            name: 'Алексей Петров',
            business: 'Кофейня "Утро"',
            text: 'Благодаря отчету нашел идеальное место в центре. Окупился за 14 месяцев!',
            result: 'Выручка ₽2.8М в месяц'
          },
          {
            name: 'Мария Сидорова',
            business: 'Салон красоты "Стиль"',
            text: 'Анализ показал, что в выбранном районе мало конкурентов. Сейчас у нас очередь на месяц вперед.',
            result: '150+ постоянных клиентов'
          },
          {
            name: 'Дмитрий Козлов',
            business: 'Фитнес-клуб "Энергия"',
            text: 'Отчет помог избежать ошибки с первоначальной локацией. Сэкономил минимум ₽800,000.',
            result: '300+ членов клуба'
          }
        ] as testimonial}
          <div class="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div class="ml-4">
                <div class="font-semibold text-foreground">{testimonial.name}</div>
                <div class="text-sm text-muted">{testimonial.business}</div>
              </div>
            </div>
            <p class="text-muted mb-4 italic">"{testimonial.text}"</p>
            <div class="text-sm font-medium text-accent">{testimonial.result}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Pricing Section -->
  <section class="py-24 bg-card/30">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
          Простое ценообразование
        </h2>
        <p class="text-xl text-muted mb-12">
          Один отчет = одно правильное решение о размещении бизнеса
        </p>
      </div>
      
      <div class="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-300">
        <div class="bg-gradient-to-br from-secondary to-accent p-1 rounded-2xl max-w-md mx-auto">
          <div class="bg-background rounded-xl p-8">
            <div class="text-6xl font-serif font-bold text-foreground mb-2">₽2,990</div>
            <div class="text-muted mb-6">за один отчет</div>
            
            <ul class="text-left space-y-3 mb-8">
              {#each [
                'Полный анализ локации',
                'Интерактивная тепловая карта',
                'Данные по всем конкурентам',
                'Демография и доходы районов',
                'Цены на аренду по улицам',
                'Конкретные рекомендации адресов',
                'Экспорт отчета в PDF'
              ] as feature}
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  {feature}
                </li>
              {/each}
            </ul>
            
            <div class="text-sm text-muted mb-6">
              💡 Средняя экономия на неправильном выборе локации: <strong class="text-foreground">₽500,000+</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- CTA Section -->
  <section class="py-24 bg-gradient-to-r from-primary to-secondary">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
          Готовы найти идеальную локацию?
        </h2>
        <p class="text-xl text-primary-foreground/80 mb-8">
          Присоединяйтесь к сотням предпринимателей, которые уже используют наш сервис
        </p>
        <button 
          onclick={() => heroRef?.scrollIntoView({ behavior: 'smooth' })}
          class="bg-background text-foreground font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Начать анализ сейчас
        </button>
      </div>
    </div>
  </section>
</div>
