<script setup lang="ts">
import { useTres } from '@tresjs/core'

const styles = {
  width: '100%',
  height: '550px',
  border: '1px solid #e2e2e2',
  borderRadius: '8px',
  overflow: 'hidden',
}

const { state } = useTres()
</script>
<template>
  <ClientOnly>
    <TresCanvas shadows clear-color="#fff" :style="styles">
      <TresPerspectiveCamera :position="[0, 2, 4]" />
      <TresScene>
        <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />

        <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
        <TresMesh :rotation="[-Math.PI / 4, -Math.PI / 4, Math.PI / 4]">
          <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
          <TresMeshToonMaterial color="#FBB03B" />
        </TresMesh>
      </TresScene>
    </TresCanvas>
  </ClientOnly>
</template>
