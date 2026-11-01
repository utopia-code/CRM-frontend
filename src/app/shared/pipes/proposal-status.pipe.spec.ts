import { ProposalStatusPipe } from './proposal-status.pipe';

describe('ProposalStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ProposalStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
