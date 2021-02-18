const baseMixin = {
  data(){
    return {
      apiUrl: 'http://www.itying.com'
    }
  },
  methods: {
    success(){
      console.log('成功');
    }
  }
}

export default baseMixin;
