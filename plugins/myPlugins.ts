export default defineNuxtPlugin(() => {
  return {
    provide: {
        sayShit: (msg: string) => console.log(msg)
    }
  };
});
