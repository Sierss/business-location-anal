<script lang="ts">
  import { onMount } from 'svelte';
  
  let { searchParams, isPaid } = $props();
  let mapContainer = $state();
  let map;
  let heatmapLayer;
  
  const fullCompetitorData = [
    { coords: [55.7558, 37.6176], weight: 0.8, name: 'Кофе Хауз', rating: 4.2 },
    { coords: [55.7539, 37.6208], weight: 0.6, name: 'Старбакс', rating: 4.0 },
    { coords: [55.7601, 37.6156], weight: 0.9, name: 'Шоколадница', rating: 3.8 },
    { coords: [55.7612, 37.6189], weight: 0.7, name: 'Кофемания', rating: 4.1 },
    { coords: [55.7523, 37.6234], weight: 0.5, name: 'Даблби', rating: 3.9 },
    { coords: [55.7587, 37.6145], weight: 0.8, name: 'Кофе Бин', rating: 4.3 },
    { coords: [55.7634, 37.6198], weight: 0.6, name: 'Прайм', rating: 3.7 },
    { coords: [55.7545, 37.6267], weight: 0.7, name: 'Кофе Тайм', rating: 4.0 }
  ];
  
  onMount(() => {
    if (isPaid && typeof window !== 'undefined') {
      initializeMap();
    }
  });
  
  function initializeMap() {
    // Initialize Yandex Map with heatmap
    if (window.ymaps) {
      window.ymaps.ready(() => {
        map = new window.ymaps.Map(mapContainer, {
          center: [55.7558, 37.6176],
          zoom: 14,
          controls: ['zoomControl', 'fullscreenControl']
        });
        
        // Add heatmap layer
        const heatmapData = fullCompetitorData.map(point => ({
          coordinates: point.coords,
          weight: point.weight
        }));
        
        heatmapLayer = new window.ymaps.Heatmap(heatmapData, {
          radius: 50,
          dissipating: false,
          opacity: 0.8,
          intensityOfMidpoint: 0.5,
          gradient: {
            0.1: 'rgba(0, 255, 255, 0)',
            0.2: 'rgba(0, 255, 255, 1)',
            0.4: 'rgba(0, 191, 255, 1)',
            0.6: 'rgba(0, 127, 255, 1)',
            0.8: 'rgba(255, 0, 255, 1)',
            1.0: 'rgba(255, 0, 0, 1)'
          }
        });
        
        heatmapLayer.setMap(map);
        
        // Add competitor markers
        fullCompetitorData.forEach(competitor => {
          const placemark = new window.ymaps.Placemark(competitor.coords, {
            balloonContent: `
              <strong>${competitor.name}</strong><br>
              Рейтинг: ${competitor.rating} ⭐<br>
              Вес в анализе: ${Math.round(competitor.weight * 100)}%
            `
          }, {
            preset: 'islands#redDotIcon'
          });
          
          map.geoObjects.add(placemark);
        });
      });
    }
  }
</script>

<div class="bg-card rounded-xl p-6 shadow-lg border border-border">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-2xl font-serif font-bold text-foreground">
      Тепловая карта конкурентов
    </h2>
    {#if isPaid}
      <div class="flex items-center space-x-2 text-sm text-muted">
        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
        <span>Низкая плотность</span>
        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
        <span>Высокая плотность</span>
      </div>
    {/if}
  </div>
  
  <div class="bg-muted/30 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
    {#if isPaid}
      <!-- Added full interactive Yandex map -->
      <div bind:this={mapContainer} class="w-full h-full rounded-lg"></div>
      <script src="https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU" async></script>
    {:else}
      <!-- Limited preview -->
      <div class="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20"></div>
      <div class="relative z-10 text-center">
        <div class="text-4xl mb-4">🔒</div>
        <div class="text-lg font-medium text-foreground mb-2">Предварительный просмотр</div>
        <div class="text-muted">Найдено 12+ конкурентов в радиусе 2 км</div>
      </div>
    {/if}
  </div>
  
  {#if isPaid}
    <!-- Added detailed statistics for paid version -->
    <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="text-center p-3 bg-background rounded-lg">
        <div class="text-xl font-bold text-foreground">{fullCompetitorData.length}</div>
        <div class="text-xs text-muted">Всего конкурентов</div>
      </div>
      <div class="text-center p-3 bg-background rounded-lg">
        <div class="text-xl font-bold text-foreground">4.0</div>
        <div class="text-xs text-muted">Средний рейтинг</div>
      </div>
      <div class="text-center p-3 bg-background rounded-lg">
        <div class="text-xl font-bold text-foreground">2.3 км</div>
        <div class="text-xs text-muted">Средняя дистанция</div>
      </div>
      <div class="text-center p-3 bg-background rounded-lg">
        <div class="text-xl font-bold text-foreground">73%</div>
        <div class="text-xs text-muted">Насыщенность рынка</div>
      </div>
    </div>
  {/if}
</div>
