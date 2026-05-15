<template>
  <section class="install-prompt" aria-live="polite">
    <div class="install-prompt__badge">
      <span>{{ mode === 'ios' ? 'iOS' : 'APP' }}</span>
    </div>

    <div class="install-prompt__copy">
      <p class="install-prompt__eyebrow">Voluntas Radio</p>
      <h2 class="install-prompt__title">
        {{ mode === 'ios' ? 'Añádela a tu pantalla de inicio' : 'Instala la app' }}
      </h2>
      <p class="install-prompt__text">
        <template v-if="mode === 'ios'">
          En iPhone o iPad, pulsa <strong>Compartir</strong> y después <strong>Añadir a pantalla de inicio</strong>.
        </template>
        <template v-else>
          Guárdala como app para abrirla más rápido y tener una experiencia más parecida a una aplicación nativa.
        </template>
      </p>
    </div>

    <div class="install-prompt__actions">
      <button
        v-if="mode === 'install'"
        type="button"
        class="install-prompt__button"
        @click="$emit('install')"
      >
        Instalar
      </button>
      <button
        type="button"
        class="install-prompt__button install-prompt__button--ghost"
        @click="$emit('dismiss')"
      >
        Cerrar
      </button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  mode: {
    type: String,
    default: 'install',
    validator: (value) => ['install', 'ios'].includes(value),
  },
});

defineEmits(['install', 'dismiss']);
</script>

<style scoped lang="scss">

.install-prompt {
  width: auto;
  margin: 1rem 0.5rem 0;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #000 0%, #151515 100%);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
}

@media screen and (min-width: 1171px) {
  .install-prompt {
    margin: 1rem auto 0;
  }
}

.install-prompt__badge {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .12em;
}

.install-prompt__copy {
  min-width: 0;
}

.install-prompt__eyebrow {
  margin: 0 0 .2rem;
  font-size: .78rem;
  text-transform: uppercase;
  letter-spacing: .14em;
  color: rgba(255, 255, 255, 0.68);
}

.install-prompt__title {
  margin: 0 0 .35rem;
  font-size: 1.25rem;
  line-height: 1.1;
}

.install-prompt__text {
  margin: 0;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.86);
}

.install-prompt__actions {
  display: flex;
  gap: .75rem;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.install-prompt__button {
  border: 1px solid #fff;
  background: #fff;
  color: #000;
  padding: .7rem 1.05rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .15s ease, opacity .15s ease, background-color .15s ease;
}

.install-prompt__button:hover {
  transform: translateY(-1px);
}

.install-prompt__button--ghost {
  background: transparent;
  color: #fff;
}

@media (max-width: 800px) {
  .install-prompt {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }

  .install-prompt__badge {
    width: 44px;
    height: 44px;
  }

  .install-prompt__actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
