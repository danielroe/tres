import { Raycaster, Vector2 } from 'three'
import { onUnmounted, provide, ref, shallowRef } from 'vue'

const raycaster = shallowRef(new Raycaster())
const pointer = ref(new Vector2())
const currentInstance = ref(null)

export function useRaycaster() {
  provide('raycaster', raycaster)
  provide('pointer', pointer)
  provide('currentInstance', currentInstance)

  function onPointerMove(event: MouseEvent) {
    pointer.value.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.value.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  window.addEventListener('pointermove', onPointerMove)

  onUnmounted(() => {
    window.removeEventListener('pointermove', onPointerMove)
  })
  return {
    raycaster,
    pointer,
  }
}