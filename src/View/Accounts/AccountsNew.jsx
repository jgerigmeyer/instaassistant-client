/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';

import {
  Table,
  Row,
  Col,
  Tooltip,
  Text,
  Card,
  Button,
  Input,
  Dropdown,
} from '@nextui-org/react';

import './scss/accounts-styles.css';
import NewAccountModal from './NewAccountModal';
import { indexAccounts } from 'api';
import { Link } from 'react-router-dom';

import { StyledBadge } from './StyledBadge';
import { IconButton } from './IconButton';
import { EyeIcon } from './EyeIcon';
import { DeleteIcon } from './DeleteIcon';
import Avatar from 'react-avatar';

// ICON IMPORTS
import { BsEmojiSunglasses } from 'react-icons/bs'; //follow
import { AiOutlineMessage } from 'react-icons/ai'; //comment
import { FaRegEnvelopeOpen } from 'react-icons/fa'; //dm
import { FiHeart } from 'react-icons/fi'; //like

function AccountsNew() {
  const [accountLoaded, setAcccountsLoaded] = useState(false);

  useEffect(() => {
    indexAccounts().then((data) => setAllAccounts(data));
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [allAccounts, setAllAccounts] = useState([]);

  const filteredAccounts = allAccounts
    .filter((account) => {
      return (
        account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.tags.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      return a.username.localeCompare(b.username);
    });

  const [newAccountVisible, setNewAccountVisible] = useState(false);
  const newAccountHandler = () => setNewAccountVisible(true);
  const closeNewAccountHandler = () => {
    setNewAccountVisible(false);
  };

  const columns = [
    { name: 'ACCOUNT', uid: 'username' },
    { name: 'PLATFORM', uid: 'platform' },
    { name: 'CONFIG', uid: 'config' },
    { name: 'TAGS', uid: 'tags' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  // t.integer :user_id
  // t.string :platform
  // t.string :username
  // t.string :tags
  // t.boolean :allow_follow
  // t.boolean :allow_like
  // t.boolean :allow_comment
  // t.boolean :allow_dm

  // figure a way to have status on ruby json return

  const [selected, setSelected] = useState(new Set(['Platform']));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(', ').replaceAll('_', ' '),
    [selected]
  );

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case 'username':
        return (
          <Link to={`/accounts/instagram/${user.id}`}>
            <div
              className="avatar"
              style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <Avatar
                name={user.username}
                round
                value="25%"
                size="65"
                textSizeRatio={2}
              />
              <Text>@{user.username}</Text>
            </div>
          </Link>
        );
      case 'platform':
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: 'capitalize' }}>
                {'Instagram'}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: 'capitalize', color: '$accents7' }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case 'status':
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;

      case 'config':
        return (
          <Col>
            <Row css={{ display: 'flex', gap: '.4rem' }}>
              {user.allow_follow && <BsEmojiSunglasses />}
              {user.allow_like && <FiHeart />}
              {user.allow_comment && <AiOutlineMessage />}
              {user.allow_dm && <FaRegEnvelopeOpen />}
            </Row>
          </Col>
        );

      case 'actions':
        return (
          <Row justify="center" align="center">
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log('View user', user.id)}>
                  <Link to={`/accounts/instagram/${user.id}`}>
                    <EyeIcon size={20} fill="#979797" />
                  </Link>
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => console.log('Delete user', user.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <>
      <div className="accounts-container">
        <Text
          h1
          size={60}
          css={{
            textGradient: '45deg, $blue600 -20%, $pink600 50%',
            height: 'fit-content',
          }}
          weight="bold"
        >
          Account Management
        </Text>
        <Card
          css={{
            background: '$myColor',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '0',
            padding: '1rem',
            height: 'fit-content',
            backdropFilter: 'blur(15px)',
          }}
        >
          <Input
            clearable
            underlined
            placeholder="Search"
            color="secondary"
            size="xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: 'capitalize' }}>
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item key="Instagram">Instagram</Dropdown.Item>
              <Dropdown.Item key="Twitter">Twitter</Dropdown.Item>
              <Dropdown.Item key="TikTok">TikTok</Dropdown.Item>
              <Dropdown.Item key="Facebook">Facebook</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button
            type="button"
            size="sm"
            color="warning"
            rounded
            onPress={newAccountHandler}
          >
            Add Account
          </Button>
        </Card>
        <Card css={{ borderRadius: '0', height: '85.5%', overflow: 'auto' }}>
          <Table
            aria-label="Example table with custom cells"
            css={{
              height: 'auto',
              minWidth: '100%',
            }}
            selectionMode="none"
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === 'actions'}
                  align={column.uid === 'actions' ? 'center' : 'start'}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={filteredAccounts}>
              {(item) => (
                <Table.Row>
                  {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Card>
      </div>
      <NewAccountModal
        newAccountHandler={newAccountHandler}
        closeNewAccountHandler={closeNewAccountHandler}
        newAccountVisible={newAccountVisible}
      />
    </>
  );
}

export default AccountsNew;