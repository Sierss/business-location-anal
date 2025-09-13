<script lang="ts">
  import { onMount } from 'svelte';
  
  let { searchParams, onComplete } = $props();
  
  let currentStep = $state(0);
  let progress = $state(0);
  let isComplete = $state(false);
  
  const steps = [
    {
      title: 'Анализируем конкурентов',
      description: 'Собираем данные о всех организациях категории "{category}" в городе {city}',
      icon: '🔍',
      duration: 3000,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Строим тепловую карту',
      description: 'Создаем интерактивную карту плотности организаций',
      icon: '🗺️',
      duration: 2500,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Анализируем демографию',
      description: 'Изучаем население районов, доходы и транспортную доступность',
      icon: '📊',
      duration: 2000,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Рассчитываем стоимость аренды',
      description: 'Собираем актуальные цены на коммерческую недвижимость',
      icon: '💰',
      duration: 1500,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Генерируем рекомендации',
      description: 'Определяем лучшие локации с обоснованием выбора',
      icon: '🎯',
      duration: 2000,
      color: 'from-pink-500 to-rose-500'
    }
  ];
  
  let stepElements = $state([]);
  let cubeRef = $state();
  let particlesRef = $state();
  
  onMount(() => {
    startAnimation();
  });
  
  async function startAnimation() {
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      currentStep = stepIndex;
      await animateStep(stepIndex);
    }
    
    isComplete = true;
    
    setTimeout(() => {
      onComplete();
    }, 1000);
  }
  
  function animateStep(stepIndex) {
    return new Promise((resolve) => {
      const step = steps[stepIndex];
      const startTime = Date.now();
      
      function updateProgress() {
        const elapsed = Date.now() - startTime;
        const stepProgress = Math.min(elapsed / step.duration, 1);
        progress = ((stepIndex + stepProgress) / steps.length) * 100;
        
        if (stepProgress < 1) {
          requestAnimationFrame(updateProgress);
        } else {
          resolve();
        }
      }
      
      updateProgress();
    });
  }
  
  function getStepDescription(description) {
    return description
      .replace('{category}', searchParams.category)
      .replace('{city}', searchParams.city);
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-background via-card/30 to-background flex items-center justify-center relative overflow-hidden">
  <!-- Animated background -->
  <div class="absolute inset-0">
    <!-- Floating particles -->
    <div bind:this={particlesRef} class="absolute inset-0">
      {#each Array(20) as _, particleIndex}
        <div 
          class="absolute w-2 h-2 bg-accent/30 rounded-full animate-float"
          style="
            left: {Math.random() * 100}%;
            top: {Math.random() * 100}%;
            animation-delay: {Math.random() * 6}s;
            animation-duration: {4 + Math.random() * 4}s;
          "
        ></div>
      {/each}
    </div>
    
    <!-- Grid pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0); background-size: 50px 50px;"></div>
    </div>
  </div>
  
  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <!-- 3D Cube Animation -->
    <div class="mb-12 flex justify-center">
      <div class="relative w-32 h-32 perspective-1000">
        <div 
          bind:this={cubeRef}
          class="w-full h-full relative transform-style-preserve-3d animate-spin-slow"
          style="animation-duration: 8s;"
        >
          <!-- Cube faces -->
          {#each ['front', 'back', 'right', 'left', 'top', 'bottom'] as face, index}
            <div 
              class="absolute w-full h-full border-2 border-accent/50 bg-gradient-to-br {steps[Math.min(index, steps.length - 1)]?.color || 'from-accent to-secondary'} opacity-80 flex items-center justify-center text-4xl transform {
                face === 'front' ? 'translateZ(64px)' :
                face === 'back' ? 'translateZ(-64px) rotateY(180deg)' :
                face === 'right' ? 'rotateY(90deg) translateZ(64px)' :
                face === 'left' ? 'rotateY(-90deg) translateZ(64px)' :
                face === 'top' ? 'rotateX(90deg) translateZ(64px)' :
                'rotateX(-90deg) translateZ(64px)'
              }"
            >
              {steps[Math.min(index, steps.length - 1)]?.icon || '⚡'}
            </div>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Progress and Status -->
    <div class="mb-8">
      <div class="text-6xl mb-4 animate-pulse">
        {isComplete ? '✅' : steps[currentStep]?.icon || '⚡'}
      </div>
      
      <h2 class="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
        {isComplete ? 'Анализ завершен!' : steps[currentStep]?.title || 'Подготовка...'}
      </h2>
      
      <p class="text-lg text-muted mb-8 max-w-2xl mx-auto">
        {isComplete ? 'Ваш персональный отчет готов к просмотру' : getStepDescription(steps[currentStep]?.description || 'Инициализация системы...')}
      </p>
    </div>
    
    <!-- Progress Bar -->
    <div class="mb-12">
      <div class="flex justify-between text-sm text-muted mb-2">
        <span>Прогресс</span>
        <span>{Math.round(progress)}%</span>
      </div>
      
      <div class="w-full bg-border rounded-full h-3 overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-accent to-secondary transition-all duration-500 ease-out relative"
          style="width: {progress}%"
        >
          <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
    
    <!-- Steps Visualization -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      {#each steps as step, index}
        <div 
          bind:this={stepElements[index]}
          class="relative p-4 rounded-xl border transition-all duration-500 transform {
            index < currentStep ? 'bg-accent/10 border-accent scale-95 opacity-60' :
            index === currentStep ? 'bg-gradient-to-br ' + step.color + ' border-transparent scale-105 shadow-2xl animate-pulse-glow' :
            'bg-card border-border scale-90 opacity-40'
          }"
        >
          <div class="text-2xl mb-2">{step.icon}</div>
          <div class="text-sm font-medium text-foreground">{step.title}</div>
          
          {#if index === currentStep}
            <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          {/if}
          
          {#if index < currentStep}
            <div class="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          {/if}
        </div>
      {/each}
    </div>
    
    {#if isComplete}
      <div class="mt-12 animate-bounce">
        <div class="text-accent text-lg font-medium">Переходим к результатам...</div>
      </div>
    {/if}
  </div>
</div>

<style>
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  
  .animate-spin-slow {
    animation: spin 8s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotateX(0deg) rotateY(0deg); }
    to { transform: rotateX(360deg) rotateY(360deg); }
  }
</style>
