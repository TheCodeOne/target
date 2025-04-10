export class TimingService {
  static async sleep(ms: number = 4000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
