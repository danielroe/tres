<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
const LightRef = ref()

onMounted(() => {
  LightRef.value.shadow.mapSize.set(1024, 1024)
  LightRef.value.shadow.camera.near = 0.5
  LightRef.value.shadow.camera.far = 2000
  LightRef.value.shadow.camera.left = -10
  LightRef.value.shadow.camera.right = 10
  LightRef.value.shadow.camera.top = 10
  LightRef.value.shadow.camera.bottom = -10
})

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" :fov="45" :aspect="1" :near="0.1" :far="1000" />

    <OrbitControls />
    <TresMesh :position="[-2, 6, 0]" :rotation="[0, Math.PI, 0]" cast-shadow>
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh :position="[0, 4, 0]" cast-shadow>
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
    <TresMesh :position="[2, 2, 0]" cast-shadow>
      <TresSphereGeometry />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" cast-shadow />
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial color="#D3FC8A" />
    </TresMesh>
    <TresAmbientLight :intensity="0.75" />
    <TresDirectionalLight ref="LightRef" :position="[0, 2, 4]" :intensity="2" cast-shadow />
  </TresCanvas>
</template>
