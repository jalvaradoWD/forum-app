import { Dialog } from '@mui/material';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SignInDialog from './SignInDialog';
import { RootState } from '../redux/app/store';
import { close as closeModal } from '../redux/features/signInModal/signInModal';

const SignInModal: FC = () => {
  const isOpen = useSelector((state: RootState) => state.SignInModal.isOpen);
  const dispatch = useDispatch();
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        dispatch(closeModal());
      }}
    >
      <SignInDialog />
    </Dialog>
  );
};

export default SignInModal;
