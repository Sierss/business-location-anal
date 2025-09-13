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

<div class="landing-page">
  <!-- Hero Section -->
  <section bind:this={heroRef} class="hero-section">
    <!-- Animated background elements -->
    <div class="bg-elements">
      <div class="bg-blob bg-blob-1"></div>
      <div class="bg-blob bg-blob-2"></div>
      <div class="bg-blob bg-blob-3"></div>
    </div>
    
    <div class="hero-content">
      <div class="animate-on-scroll hero-text">
        <h1 class="hero-title">
          Найдите <span class="gradient-text">идеальное место</span> для вашего бизнеса
        </h1>
        
        <p class="hero-subtitle">
          Профессиональная аналитика локаций на основе данных о конкурентах, демографии и инфраструктуре. 
          Принимайте решения на основе фактов, а не догадок.
        </p>
      </div>
      
      <!-- Search Form -->
      <div class="animate-on-scroll search-form">
        <div class="form-card">
          <h3 class="form-title">Получите анализ за 2 минуты</h3>
          
          <div class="form-fields">
            <div class="field-group">
              <label for="category" class="field-label">Тип бизнеса</label>
              <select id="category" bind:value={category} class="field-select">
                <option value="">Выберите категорию</option>
                {#each categories as cat}
                  <option value={cat}>{cat}</option>
                {/each}
              </select>
            </div>
            
            <div class="field-group">
              <label for="city" class="field-label">Город</label>
              <select id="city" bind:value={city} class="field-select">
                <option value="">Выберите город</option>
                {#each cities as c}
                  <option value={c}>{c}</option>
                {/each}
              </select>
            </div>
            
            <button 
              onclick={handleSubmit}
              disabled={!category || !city || isLoading}
              class="submit-btn"
              class:loading={isLoading}
              class:disabled={!category || !city || isLoading}
            >
              {#if isLoading}
                <div class="loading-content">
                  <div class="spinner"></div>
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
  <section class="features-section">
    <div class="section-content">
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">Что вы получите в отчете</h2>
        <p class="section-subtitle">
          Комплексный анализ, который поможет принять правильное решение о размещении бизнеса
        </p>
      </div>
      
      <div class="features-grid">
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
          <div class="feature-card animate-on-scroll" style="animation-delay: {index * 100}ms;">
            <div class="feature-icon">{feature.icon}</div>
            <h3 class="feature-title">{feature.title}</h3>
            <p class="feature-description">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Social Proof Section -->
  <section class="testimonials-section">
    <div class="section-content">
      <div class="section-header">
        <h2 class="section-title">Нам доверяют предприниматели</h2>
        <p class="section-subtitle">
          Более 500 успешных бизнесов открыто с нашими рекомендациями
        </p>
      </div>
      
      <div class="testimonials-grid">
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
          <div class="testimonial-card">
            <div class="testimonial-header">
              <div class="testimonial-avatar">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div class="testimonial-info">
                <div class="testimonial-name">{testimonial.name}</div>
                <div class="testimonial-business">{testimonial.business}</div>
              </div>
            </div>
            <p class="testimonial-text">"{testimonial.text}"</p>
            <div class="testimonial-result">{testimonial.result}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Pricing Section -->
  <section class="pricing-section">
    <div class="pricing-content">
      <div class="section-header animate-on-scroll">
        <h2 class="section-title">Простое ценообразование</h2>
        <p class="section-subtitle">
          Один отчет = одно правильное решение о размещении бизнеса
        </p>
      </div>
      
      <div class="pricing-card animate-on-scroll">
        <div class="pricing-inner">
          <div class="price">₽2,990</div>
          <div class="price-subtitle">за один отчет</div>
          
          <ul class="features-list">
            {#each [
              'Полный анализ локации',
              'Интерактивная тепловая карта',
              'Данные по всем конкурентам',
              'Демография и доходы районов',
              'Цены на аренду по улицам',
              'Конкретные рекомендации адресов',
              'Экспорт отчета в PDF'
            ] as feature}
              <li class="feature-item">
                <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                {feature}
              </li>
            {/each}
          </ul>
          
          <div class="savings-note">
            💡 Средняя экономия на неправильном выборе локации: <strong>₽500,000+</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- CTA Section -->
  <section class="cta-section">
    <div class="cta-content">
      <div class="animate-on-scroll">
        <h2 class="cta-title">Готовы найти идеальную локацию?</h2>
        <p class="cta-subtitle">
          Присоединяйтесь к сотням предпринимателей, которые уже используют наш сервис
        </p>
        <button 
          onclick={() => heroRef?.scrollIntoView({ behavior: 'smooth' })}
          class="cta-button"
        >
          Начать анализ сейчас
        </button>
      </div>
    </div>
  </section>
</div>

<style>
  .landing-page {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  /* Hero Section */
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    overflow: hidden;
  }

  .bg-elements {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .bg-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.3;
    animation: float 6s ease-in-out infinite;
  }

  .bg-blob-1 {
    top: 25%;
    left: 25%;
    width: 256px;
    height: 256px;
    background: rgba(255, 255, 255, 0.1);
  }

  .bg-blob-2 {
    bottom: 25%;
    right: 25%;
    width: 384px;
    height: 384px;
    background: rgba(255, 255, 255, 0.15);
    animation-delay: -3s;
  }

  .bg-blob-3 {
    top: 50%;
    left: 50%;
    width: 128px;
    height: 128px;
    background: rgba(255, 255, 255, 0.08);
    animation-delay: -1.5s;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }

  .hero-content {
    position: relative;
    z-index: 10;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
  }

  .hero-text {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease;
  }

  .hero-text.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    color: white;
    margin-bottom: 24px;
    line-height: 1.2;
  }

  .gradient-text {
    background: linear-gradient(45deg, #ffd89b 0%, #19547b 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 3s ease infinite;
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .hero-subtitle {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 48px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  /* Search Form */
  .search-form {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease 0.3s;
    max-width: 500px;
    margin: 0 auto;
  }

  .search-form.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .form-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .form-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 24px;
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .field-group {
    text-align: left;
  }

  .field-label {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    color: #666;
    margin-bottom: 8px;
  }

  .field-select {
    width: 100%;
    padding: 12px 16px;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .field-select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .submit-btn {
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
    padding: 16px 32px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: translateY(0);
  }

  .submit-btn:hover:not(.disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  .submit-btn.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .loading-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Features Section */
  .features-section {
    padding: 96px 0;
    background: #f8fafc;
  }

  .section-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 64px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease;
  }

  .section-header.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16px;
  }

  .section-subtitle {
    font-size: 1.25rem;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
  }

  .feature-card {
    background: white;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(30px);
  }

  .feature-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: 16px;
  }

  .feature-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 12px;
  }

  .feature-description {
    color: #6b7280;
    line-height: 1.6;
  }

  /* Testimonials Section */
  .testimonials-section {
    padding: 96px 0;
    background: white;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
  }

  .testimonial-card {
    background: #f8fafc;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #e5e7eb;
  }

  .testimonial-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .testimonial-avatar {
    width: 48px;
    height: 48px;
    background: #667eea;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
  }

  .testimonial-info {
    margin-left: 16px;
  }

  .testimonial-name {
    font-weight: 600;
    color: #1f2937;
  }

  .testimonial-business {
    font-size: 0.9rem;
    color: #6b7280;
  }

  .testimonial-text {
    color: #6b7280;
    font-style: italic;
    margin-bottom: 16px;
  }

  .testimonial-result {
    font-size: 0.9rem;
    font-weight: 500;
    color: #667eea;
  }

  /* Pricing Section */
  .pricing-section {
    padding: 96px 0;
    background: #f8fafc;
  }

  .pricing-content {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
  }

  .pricing-card {
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: 2px;
    border-radius: 20px;
    margin-top: 48px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease 0.3s;
  }

  .pricing-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .pricing-inner {
    background: white;
    border-radius: 18px;
    padding: 48px 32px;
  }

  .price {
    font-size: 4rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .price-subtitle {
    color: #6b7280;
    margin-bottom: 32px;
  }

  .features-list {
    list-style: none;
    padding: 0;
    margin: 0 0 32px 0;
    text-align: left;
  }

  .feature-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .check-icon {
    width: 20px;
    height: 20px;
    color: #667eea;
    margin-right: 12px;
    flex-shrink: 0;
  }

  .savings-note {
    font-size: 0.9rem;
    color: #6b7280;
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;
  }

  /* CTA Section */
  .cta-section {
    padding: 96px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .cta-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
  }

  .cta-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: white;
    margin-bottom: 16px;
  }

  .cta-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 32px;
  }

  .cta-button {
    background: white;
    color: #1f2937;
    font-weight: 600;
    padding: 16px 32px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  /* Animation classes */
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease;
  }

  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .features-grid,
    .testimonials-grid {
      grid-template-columns: 1fr;
    }
    
    .hero-content,
    .section-content,
    .pricing-content,
    .cta-content {
      padding: 0 16px;
    }
    
    .form-card {
      padding: 24px 20px;
    }
  }
</style>
