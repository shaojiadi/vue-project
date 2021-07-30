import { mount } from '@vue/test-utils'
import ModifyPanel from '@/components/modifyPanel.vue'

describe("modifyPancel.vue",()=>{
  test("cancel is ok", async()=>{
    const wrapper = mount(ModifyPanel);
    await wrapper.get("#btn").trigger("click");
    expect(wrapper.emitted("cancel")[0]).toEqual([6]);
  })

  test("save is ok", async()=>{
    const wrapper = mount(ModifyPanel);
    await wrapper.get("#btn2").trigger("click");
    expect(wrapper.emitted("save")).not.toBeNull();
  })
})


